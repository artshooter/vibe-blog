# 架构设计文档

## 核心理念

**有氛围的阅读** - 每篇文章都是独立的 Web 体验，拥有独特的设计和交互。

---

## 技术栈

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- next-intl（多语言）
- pnpm

---

## 文件系统架构

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
middleware.ts                        # 语言检测
```

---

## 核心约定

### 路由规则

基于 Next.js 文件系统路由：

```
/zh                      → 首页（中文）
/en                      → 首页（英文）
/zh/[article-name]       → 文章详情（中文）
/en/[article-name]       → 文章详情（英文）
```

### Cover.tsx（必需）

- **位置**：`app/[locale]/[article-name]/Cover.tsx`
- **作用**：文章封面，在首页展示
- **类比**：书架上看到的书籍封面

### page.tsx（必需）

- **位置**：`app/[locale]/[article-name]/page.tsx`
- **作用**：文章详情页路由
- **自由度**：内容组织方式完全自由，由设计决定

### components/[article-name]/（必需）

- **位置**：`app/components/[article-name]/`
- **必需文件**：`design.md`（设计文档）
- **其他组件**：完全自由，根据设计需求实现

---

## 多语言架构

- 语言通过路由区分：`/zh` vs `/en`
- 配置文件：`i18n/config.ts`（定义 locales: ['zh', 'en']）
- 翻译文件：`messages/zh/` 和 `messages/en/`
- 自动检测：`middleware.ts` 负责语言重定向

---

## 设计原则

### 文档驱动

每篇文章从 `design.md` 开始：
1. 分析内容主题和情绪
2. 设计色彩、排版、交互方案
3. 基于设计文档编码实现

详见 [DESIGN_GUIDE.md](./DESIGN_GUIDE.md)

### 完全自由

架构只约束必要的结构（Cover.tsx、page.tsx、design.md），文章内容完全自由发挥。每篇文章都是独特的设计作品。

---

## 相关文档

- [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) - 设计规范与创意来源
- [ARTICLE_CREATION.md](./ARTICLE_CREATION.md) - 文章创作流程
- [CLAUDE.md](../CLAUDE.md) - AI 协作入口
