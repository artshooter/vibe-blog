# Vibe Blog
**氛围博客** - 每篇文章都带给你独特的体验

- 视觉风格匹配文章情绪，交互组件帮助理解内容
- 通过设计营造沉浸感
- 形式服务于内容，拒绝模板化

> ## 快速开始 
>**该部分供人类阅读，AI 请跳过此部分，从"文件结构"开始阅读**
>
>  这是一个「氛围博客」项目 —— 你的每篇博客文章都有独特的视觉风格和交互体验，而不是千篇一律的模板。
> 
> **如何使用该项目：**
> 
> 1. 切换到 `blank` 分支（这是干净的起点）
> 2. 让 AI 阅读这个 README
> 3. 告诉 AI：「写文章」
> 4. AI 会引导你录入文章内容，跟着AI流程走就行
![Quick Start](./quick-start.png)




## 文件结构

```
app/
├── [locale]/                        # 多语言路由（zh/en）
│   ├── page.tsx                    # 首页
│   └── [article-name]/
│       ├── page.tsx                # 文章详情页
│       ├── Cover.tsx               # 封面组件
│       └── design.md               # 设计文档
│
├── components/
│   ├── common/                     # 通用组件
│   └── [article-name]/             # 文章内部组件
│       ├── content.md              # 文章内容
│       └── *.tsx                   # 自定义组件
│
└── data/
    └── articles.ts                 # 文章元数据列表

docs/                                # 项目文档
├── ARCHITECTURE.md                 # 技术架构
├── DESIGN_GUIDE.md                 # 设计规范
└── ARTICLE_CREATION.md             # 创作流程

i18n/                                # 多语言配置
messages/                            # 翻译文件（zh/en）
```

## 文档导航

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - 技术架构和文件组织规范
- **[DESIGN_GUIDE.md](./docs/DESIGN_GUIDE.md)** - 如何从内容提取设计灵感
- **[ARTICLE_CREATION.md](./docs/ARTICLE_CREATION.md)** - 完整的文章创作流程SOP（给 AI 使用）

## 核心约定

### 每篇文章必需的文件

- `app/[locale]/[article-name]/page.tsx` - 文章详情页
- `app/[locale]/[article-name]/Cover.tsx` - 首页展示的封面
- `app/[locale]/[article-name]/design.md` - 设计文档

### 设计原则

1. **风格跟随内容** - 从文章情绪推导视觉风格
2. **交互赋能内容** - 为关键内容增加交互
3. **巧思创造沉浸** - 用隐喻让读者"进入"文章
4. **响应式设计** - 桌面端和移动端同等重要

### 多语言

- 文章内容：中文
- 翻译：AI 自动生成英文翻译
- 路由：`/zh/article` 和 `/en/article`

## 创建文章

遵循 [ARTICLE_CREATION.md](./docs/ARTICLE_CREATION.md) 的完整流程。
