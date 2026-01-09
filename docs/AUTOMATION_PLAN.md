# 文章引入自动化方案

## 问题分析

**原有流程的问题**：每添加一篇新文章，需要手动修改至少 5 个地方：

1. ❌ `app/[locale]/page.tsx` - 导入新文章、添加到 allArticles 数组
2. ❌ `i18n/request.ts` - 导入各语言的翻译文件、添加到 messages 对象
3. ❌ 创建翻译文件 - `messages/zh/[article-name].json`
4. ❌ 创建翻译文件 - `messages/en/[article-name].json`
5. ❌ 记住和遵循所有规范（命名、导出、结构等）

## 解决方案概述

✨ **自动化文章发现系统**：只要按规范创建文章组件，系统会自动发现和加载。

**核心改变**：
- 首页从 **手动配置** → **自动发现**
- i18n 翻译加载从 **手动导入** → **自动扫描加载**

---

## 实现方案详情

### 1️⃣ 新增模块：文章自动加载器

**文件**：`app/lib/articles-loader.ts`

```typescript
// 自动发现机制：
// - 定义 ARTICLE_MODULES 列表（由脚本自动更新）
// - getAllPublishedArticles() 函数动态加载所有文章
// - getArticleNames() 函数提供文章列表给 i18n

export async function getAllPublishedArticles(): Promise<Article[]>
export function getArticleNames(): string[]
```

**特点**：
- 自动过滤已发布的文章（status === 'published'）
- 按发布日期倒序排列
- 错误处理：加载失败时只记录警告，不中断流程

---

### 2️⃣ 新增脚本：自动扫描工具

**文件**：`scripts/generate-articles-list.js`

```bash
node scripts/generate-articles-list.js
```

**工作原理**：
1. 扫描 `app/components/` 下的所有文件夹
2. 检查是否有 `index.tsx` 或 `index.ts`
3. 自动生成 `app/lib/articles-loader.ts`（更新 ARTICLE_MODULES）
4. 输出日志显示找到的文章列表

**执行时机**：
- 开发时：`npm run dev` 自动执行
- 构建时：`npm run build` 自动执行
- 手动执行：`npm run articles:scan`

---

### 3️⃣ 修改首页实现

**文件**：`app/[locale]/page.tsx`

**改动**：
```diff
- import { worldWarOneArticle } from '@/app/components/world-war-one'
- import { mnistArticle } from '@/app/components/mnist-neural-network'
- import { ordinaryPerson2025Article } from '@/app/components/ordinary-person-2025'
-
- const allArticles = [
-   worldWarOneArticle,
-   mnistArticle,
-   ordinaryPerson2025Article,
- ]
-
- const articles = allArticles
-   .filter((a) => a.meta.status === 'published')
-   .sort((a, b) => ...)

+ import { getAllPublishedArticles } from '@/app/lib/articles-loader'
+
+ export default async function HomePage() {
+   const articles = await getAllPublishedArticles()
```

**改动影响**：
- ✅ 首页变为异步组件（SSR）
- ✅ 无需手动添加新文章
- ✅ 自动获取所有已发布的文章

---

### 4️⃣ 修改 i18n 配置

**文件**：`i18n/request.ts`

**改动**：
```diff
+ import { getArticleNames } from '@/app/lib/articles-loader'

- const worldWarOneMessages = (await import(`@/messages/${locale}/world-war-one.json`)).default
- const mnistMessages = (await import(`@/messages/${locale}/mnist-neural-network.json`)).default
- const ordinaryPerson2025Messages = (await import(`@/messages/${locale}/ordinary-person-2025.json`)).default
-
- return {
-   locale,
-   messages: {
-     ...commonMessages,
-     'world-war-one': worldWarOneMessages,
-     'mnist-neural-network': mnistMessages,
-     'ordinary-person-2025': ordinaryPerson2025Messages,
-   },
- }

+ // 动态加载所有文章的翻译
+ const articleMessages: Record<string, any> = {}
+ const articleNames = getArticleNames()
+
+ for (const articleName of articleNames) {
+   try {
+     const messages = (await import(`@/messages/${locale}/${articleName}.json`)).default
+     articleMessages[articleName] = messages
+   } catch (error) {
+     console.warn(`[i18n] 未找到翻译文件: messages/${locale}/${articleName}.json`)
+   }
+ }
+
+ return {
+   locale,
+   messages: {
+     ...commonMessages,
+     ...articleMessages,
+   },
+ }
```

**改动影响**：
- ✅ i18n 自动加载所有翻译文件
- ✅ 无需手动在 request.ts 中添加导入
- ✅ 错误处理：缺失翻译文件时给出警告但不中断

---

### 5️⃣ 配置 npm 脚本

**文件**：`package.json`

**改动**：
```json
{
  "scripts": {
    "articles:scan": "node scripts/generate-articles-list.js",
    "dev": "npm run articles:scan && rm -rf .next && next dev",
    "build": "npm run articles:scan && next build"
  }
}
```

---

## 完整工作流

### 添加新文章的流程（简化版）

```
1. 创建文件结构
   app/components/[article-name]/
     └── index.tsx      (导出 [camelCase]Article)
     ├── Hero.tsx
     ├── Content.tsx
     └── ...

2. 创建翻译文件
   messages/zh/[article-name].json
   messages/en/[article-name].json

3. 运行开发或构建
   npm run dev          (自动执行 articles:scan)

4. 完成！
   - 首页自动显示新文章
   - i18n 自动加载翻译
   - 无需修改任何配置文件
```

---

## 核心规范

### 必须遵守的约定

#### 1. 文件夹命名
- 使用 kebab-case（小写字母 + 连字符）
- 例：`world-war-one`、`mnist-neural-network`

#### 2. 导出命名规范
必须在 `app/components/[article-name]/index.tsx` 中导出：

```typescript
export const [camelCaseArticleName]Article: Article = {
  meta: { ... },
  Hero,
  Content,
}
```

**转换规则**：kebab-case → camelCase（第一个单词小写，后续单词首字母大写）

| 文件夹名 | 导出名称 |
|---------|--------|
| `world-war-one` | `worldWarOneArticle` |
| `mnist-neural-network` | `mnistArticle` |
| `ordinary-person-2025` | `ordinaryPerson2025Article` |
| `my-first-article` | `myFirstArticleArticle` |

#### 3. 文章组件结构
```
app/components/[article-name]/
  ├── index.tsx          ← 必须！导出 Article 对象
  ├── Hero.tsx
  ├── Content.tsx
  └── [其他组件].tsx
```

#### 4. i18n 命名空间
翻译文件名称 = 文件夹名称

```
messages/zh/world-war-one.json      ← namespace: 'world-war-one'
messages/en/world-war-one.json
```

### 自动发现的条件

脚本会自动发现的文件夹必须满足：
- ✅ 在 `app/components/` 下
- ✅ 包含 `index.tsx` 或 `index.ts`
- ✅ 不是 `common` 文件夹

---

## 关键文件清单

### 新增文件
- ✨ `app/lib/articles-loader.ts` - 文章自动加载器
- ✨ `scripts/generate-articles-list.js` - 自动扫描脚本
- ✨ `docs/AUTOMATION_PLAN.md` - 本文档

### 修改文件
- 📝 `app/[locale]/page.tsx` - 使用自动加载器
- 📝 `i18n/request.ts` - 动态加载翻译
- 📝 `package.json` - 添加 npm 脚本
- 📝 `docs/ARTICLE_CREATION.md` - 更新工作流文档

---

## 优势对比

### 旧流程 vs 新流程

| 维度 | 旧流程 | 新流程 |
|------|-------|-------|
| **手动修改文件数** | 5+ 个 | 0 个 |
| **需要修改的配置** | 多个 | 0 个 |
| **容易出错的地方** | 导入、命名空间、列表 | 无 |
| **添加新文章时间** | 10+ 分钟 | 2-3 分钟 |
| **遗漏导致的问题** | 常见 | 不可能 |
| **代码复杂度** | 中等 | 自动化 |

---

## 故障排查

### 问题：新文章不显示在首页

**可能原因**：

1. 文件夹名称或导出名称不符合规范
   - ✅ 文件夹：kebab-case（例 `my-article`）
   - ✅ 导出名：camelCase + Article（例 `myArticleArticle`）

2. 文章状态为草稿
   ```typescript
   status: 'draft'  // ❌ 不会显示
   status: 'published'  // ✅ 会显示
   ```

3. 没有运行扫描脚本
   ```bash
   npm run articles:scan  # 手动执行
   ```

### 解决步骤

```bash
# 1. 检查文件夹结构
ls app/components/[article-name]/index.tsx

# 2. 验证导出
grep "export const" app/components/[article-name]/index.tsx

# 3. 手动运行扫描
npm run articles:scan

# 4. 检查生成的列表
cat app/lib/articles-loader.ts | grep "ARTICLE_MODULES"
```

---

## 技术亮点

### 1. 动态导入 + 错误处理
```typescript
try {
  const module = await import(`@/app/components/${moduleName}`)
  // 处理加载成功
} catch (error) {
  console.error(`加载失败: ${moduleName}`)
  // 继续处理其他文章，不中断流程
}
```

### 2. 自动脚本 + npm 集成
- 脚本在每次 dev/build 时自动执行
- 无需用户手动操作
- 输出友好的日志信息

### 3. 类型安全 + 灵活性
- 保留 TypeScript 类型检查
- 动态加载不失类型安全
- 完全支持 SSR

---

## 后续改进空间

可能的未来优化：

1. **热更新**：在开发环境中，文件变化时自动重新扫描
2. **缓存**：扫描结果缓存，减少重复工作
3. **预加载**：在构建时预加载所有文章，提高首页加载速度
4. **分析**：生成文章统计报告（总数、草稿数、最新发布等）
5. **验证**：在构建时验证所有文章是否完整（缺失翻译文件等）

---

## 总结

✅ **完全自动化** - 无需手动修改配置
✅ **规范驱动** - 约定优于配置
✅ **错误容错** - 缺失文件只警告，不中断
✅ **开发友好** - 集成到 npm scripts，无缝使用
✅ **可维护性强** - 集中管理，易于扩展

**新的工作流**：只需关注创建文章内容和组件，其余一切自动化！
