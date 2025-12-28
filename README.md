# 项目概览

## 核心理念

**氛围阅读** - 用网页技术为每篇文章创造独特的阅读氛围。

- 视觉风格匹配文章情绪
- 交互组件帮助理解内容
- 设计营造沉浸感
- 形式服务于内容，拒绝模板化

每篇文章都是独特的 Web 体验。

## 文件结构

```
app/
├── [locale]/                        # 多语言路由（zh/en）
│   ├── page.tsx                    # 首页
│   └── [article-name]/
│       ├── page.tsx                # 文章详情页
│       └── Cover.tsx               # 封面组件
│
├── components/
│   ├── common/                     # 通用组件
│   └── [article-name]/             # 文章内部组件
│       ├── design.md               # 设计文档
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
- **[ARTICLE_CREATION.md](./docs/ARTICLE_CREATION.md)** - 完整的文章创作流程（给 AI 使用）

## 核心约定

### 每篇文章必需的文件

- `app/[locale]/[article-name]/page.tsx` - 文章详情页
- `app/[locale]/[article-name]/Cover.tsx` - 首页展示的封面
- `app/components/[article-name]/design.md` - 设计文档

### 设计原则

1. **风格跟随内容** - 从文章情绪推导视觉风格
2. **交互赋能内容** - 为关键内容增加交互
3. **巧思创造沉浸** - 用隐喻让读者"进入"文章
4. **响应式设计** - 桌面端和移动端同等重要

### 多语言

- 文章内容：中文
- 翻译：AI 自动生成英文翻译
- 路由：`/zh/article` 和 `/en/article`

## 创建新文章

当用户说"帮我创建一篇新文章"时，严格遵循 [ARTICLE_CREATION.md](./docs/ARTICLE_CREATION.md) 的流程。
