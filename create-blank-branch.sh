#!/bin/bash
set -e

CURRENT_BRANCH=$(git branch --show-current)

# 1. 暂存未提交的更改
if [[ -n $(git status --porcelain) ]]; then
  echo ">> Stashing uncommitted changes..."
  git stash push -m "temp-stash-for-blank-branch"
  STASHED=true
fi

# 2. 处理本地 blank 分支
if git show-ref --verify --quiet refs/heads/blank; then
  echo ">> Local blank branch exists, deleting..."
  git branch -D blank
fi

# 3. 基于主分支创建 blank
BASE_BRANCH=$(git remote show origin | grep 'HEAD branch' | awk '{print $NF}')
echo ">> Creating blank branch from $BASE_BRANCH..."
git checkout $BASE_BRANCH
git pull origin $BASE_BRANCH
git checkout -b blank

# 4. 动态删除文章目录
echo ">> Removing article directories..."

# app/[locale]/ 下的所有子目录都是文章
for dir in app/\[locale\]/*/; do
  if [[ -d "$dir" ]]; then
    echo "   Removing $dir"
    rm -rf "$dir"
  fi
done

# app/components/ 下除了 common/ 和 rag-chat/ 的子目录都是文章
for dir in app/components/*/; do
  dirname=$(basename "$dir")
  if [[ -d "$dir" && "$dirname" != "common" && "$dirname" != "rag-chat" ]]; then
    echo "   Removing $dir"
    rm -rf "$dir"
  fi
done

# 5. 删除翻译文件（保留 common.json）
echo ">> Removing article translation files..."
for lang in zh en; do
  if [[ -d "messages/$lang" ]]; then
    for file in messages/$lang/*.json; do
      if [[ -f "$file" ]]; then
        filename=$(basename "$file")
        if [[ "$filename" != "common.json" ]]; then
          echo "   Removing $file"
          rm -f "$file"
        fi
      fi
    done
  fi
done

# 6. 清理向量数据库
echo ">> Cleaning vector database..."
if [[ -d "data/vectors.lance" ]]; then
  echo "   Removing data/vectors.lance"
  rm -rf "data/vectors.lance"
fi

# 7. 重置 articles-loader.ts
echo ">> Resetting articles-loader.ts..."
sed -i '' "s/const ARTICLE_MODULES = \[$/const ARTICLE_MODULES: string[] = [/" app/lib/articles-loader.ts
# 删除 ARTICLE_MODULES 数组中的所有文章条目
sed -i '' "/'.*',$/d" app/lib/articles-loader.ts

# 8. 重置 page.tsx（使用当前的服务端组件风格）
echo ">> Resetting page.tsx..."
cat > "app/[locale]/page.tsx" << 'EOF'
import { getTranslations } from 'next-intl/server'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import { getAllPublishedArticles } from '@/app/lib/articles-loader'

export default async function HomePage() {
  const articles = await getAllPublishedArticles()
  const t = await getTranslations()

  return (
    <main className="min-h-screen bg-black text-white">
      <LanguageSwitch />

      {/* Header */}
      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] text-white/60">{t('home.blogTitle')}</h1>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => {
            const { Hero } = article
            return (
              <div key={article.meta.articleName} className="relative group">
                <Hero inHome={true} />
                <div className="absolute bottom-3 right-3 text-xs text-white/40 font-mono">
                  {article.meta.date}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pb-12 text-center text-gray-500 text-sm">
        {t('home.endOfList', { count: articles.length })}
      </div>
    </main>
  )
}
EOF

# 9. 提交
echo ">> Committing..."
git add .
git commit -m "Create blank template branch - no articles"

# 10. 切回原分支
echo ">> Switching back to $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

if [[ "$STASHED" == "true" ]]; then
  echo ">> Restoring stashed changes..."
  git stash pop
fi

echo ">> Done! blank branch created."
