# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供项目指导。

## 项目简介

Vibe Blog（氛围博客）- 基于 Next.js 16 的博客平台，每篇文章都有独特的视觉设计和交互体验，拒绝模板化。形式服务于内容。

## 技术栈

- Next.js 16 (App Router) + React 19
- TypeScript, Tailwind CSS v4, Framer Motion
- next-intl 多语言（zh/en）
- pnpm 包管理器

## 常用命令

```bash
pnpm dev              # 启动开发服务器（自动扫描文章）
pnpm build            # 生产构建（自动扫描文章）
pnpm lint             # ESLint 检查
pnpm lint:fix         # 修复 lint 问题
pnpm format           # Prettier 格式化
pnpm type-check       # TypeScript 类型检查
pnpm articles:scan    # 手动重新生成文章列表
```

## 架构

### 文章结构（双层架构）

**路由层** `app/[locale]/[article-name]/`：
- `page.tsx` - 路由入口，导入 Content 组件
- `content.md` - 文章原始内容
- `design.md` - 设计文档

**组件层** `app/components/[article-name]/`：
- `index.tsx` - 导出 `[camelCase]Article` 对象（meta + 组件）
- `Hero.tsx` - 双模式：`inHome={true}` 首页卡片（h-[200px]，用 Link 包裹），`inHome={false}` 文章头部
- `Content.tsx` - 文章主体（'use client'）
- 其他自定义组件

### 自动发现机制

文章自动发现，无需手动配置：
1. 在 `app/components/[article-name]/` 创建组件文件夹
2. 在 `messages/{zh,en}/[article-name].json` 创建翻译文件
3. 运行 `pnpm dev` 或 `pnpm build` - 脚本自动更新 `app/lib/articles-loader.ts`

### 类型定义（`app/components/types.ts`）

```typescript
interface ArticleMeta {
  articleName: string      // kebab-case URL 名称
  title: string
  description: string
  date: string             // YYYY-MM-DD
  tags: string[]
  status: 'draft' | 'published'
}

interface Article {
  meta: ArticleMeta
  Hero: ComponentType<{ inHome?: boolean }>
  Content: ComponentType
}
```

### 命名规范

文章文件夹 `world-war-one` → 在 index.tsx 中导出 `worldWarOneArticle`

## 关键约定

- 所有文本使用 `useTranslations('[article-name]')` - 禁止硬编码
- 使用 `useTranslations` 的组件需要 `'use client'` 指令
- 首页卡片必须使用 `h-[200px]` 高度，并用 `<Link>` 包裹
- 翻译 JSON 使用命名对象（`section1`, `section2`），不使用数组索引
- 文章内容必须 100% 保留 - 不得为设计而修改或删除原文

## 文档

- `docs/ARTICLE_CREATION.md` - 文章创建完整 SOP（7 步骤）
- `docs/DESIGN_GUIDE.md` - 四个设计原则：风格跟随内容、交互赋能内容、巧思创造沉浸、响应式设计
- `docs/ARCHITECTURE.md` - 技术架构详情
