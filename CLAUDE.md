# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供项目指导。

## 项目简介

Vibe Blog（氛围博客）- 基于 Next.js 16 的博客平台，每篇文章都有独特的视觉设计和交互体验，拒绝模板化。形式服务于内容。

## 技术栈

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + next-intl (zh/en) + pnpm

## 常用命令

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 生产构建
pnpm lint:fix         # 修复 lint 问题
pnpm type-check       # TypeScript 类型检查
pnpm vectors:build    # 构建 RAG 向量数据库
```

## 核心架构

**功能模块**
- 文章系统 - 首页展示 + 详情页，每篇文章独立设计
- 多语言 - next-intl 支持 zh/en
- RAG 问答 - 基于文章内容的向量检索

**目录结构**
- `app/[locale]/[article]/` - 路由层（page.tsx + content.md + design.md）
- `app/components/articles/[article]/` - 组件层（Hero + Content + 自定义组件）
- `messages/{zh,en}/` - 翻译文件
- `app/lib/rag/` - RAG 运行时

详见 `docs/ARCHITECTURE.md`

## 关键约定

- 禁止硬编码文本 - 必须用 `useTranslations`
- 文章内容 100% 保留 - 禁止为设计删改原文

## 可用 Skills

- `/generate-design` - 根据文章内容生成设计文档
- `/generate-webpage` - 根据设计文档生成页面组件
