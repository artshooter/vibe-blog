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

# app/components/ 下除了 common/ 的子目录都是文章
for dir in app/components/*/; do
  dirname=$(basename "$dir")
  if [[ -d "$dir" && "$dirname" != "common" ]]; then
    echo "   Removing $dir"
    rm -rf "$dir"
  fi
done

# 5. 清空 page.tsx
echo ">> Cleaning page.tsx..."
cat > "app/[locale]/page.tsx" << 'EOF'
import { useTranslations } from 'next-intl'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import { Article } from '@/app/components/types'

// 文章列表 - 新文章在此添加
const allArticles: Article[] = []

const articles = allArticles
  .filter((a) => a.meta.status === 'published')
  .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="min-h-screen bg-black text-white">
      <LanguageSwitch />
      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] text-white/60">{t('home.blogTitle')}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 gap-24">
          {articles.map((article, index) => {
            const { Hero } = article
            return (
              <div key={article.meta.articleName} className="relative">
                {index > 0 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}
                <div className="absolute -left-20 top-4 font-extralight text-lg text-white/40 tracking-widest italic hidden md:block">
                  {article.meta.date.slice(5)}
                </div>
                <Hero inHome={true} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="pb-12 text-center text-gray-500 text-sm">
        {t('home.endOfList', { count: articles.length })}
      </div>
    </main>
  )
}
EOF

# 6. 提交
echo ">> Committing..."
git add .
git commit -m "Create blank template branch - no articles"

# 7. 切回原分支
echo ">> Switching back to $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

if [[ "$STASHED" == "true" ]]; then
  echo ">> Restoring stashed changes..."
  git stash pop
fi

echo ">> Done! blank branch created."
