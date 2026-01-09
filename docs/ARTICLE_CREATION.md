# 文章创作流程 SOP

本文档是给 AI 使用的操作指南。当用户说"创建一篇新文章"时，按照以下流程执行。

---

## Step 1: 获取文章内容

询问用户获取内容的方式：

### 方式 A：用户已有文档
1. 询问用户文件路径
2. 使用 Read 工具读取文件
3. 根据内容生成 article-name（文章的 URL 名称）：
   - 如果内容有明确标题 → 使用标题的英文版（kebab-case）
   - 如果没有标题 → 根据主题自行拟定英文名称
4. 创建 `app/[locale]/[article-name]/content.md`
5. 将读取的内容写入 content.md

### 方式 B：用户直接提供内容
1. 提示用户直接粘贴文章内容
2. 用户粘贴后，根据内容生成 article-name（同上规则）
3. 创建 `app/[locale]/[article-name]/content.md`
4. 将用户提供的内容写入 content.md

**article-name 规则**：小写英文字母 + 连字符，例如 `atomic-habits`、`my-resume`

---

## Step 2: 分析文章内容

读取 `app/[locale]/[article-name]/content.md`，分析以下内容：

- **核心主题**：文章讲什么？
- **情绪基调**：给人什么感受？
- **可交互元素**：哪些内容可以做成交互组件？
  - 概念解释 → 可视化演示
  - 数据对比 → 动态图表
  - 场景描述 → 沉浸式组件
- **核心隐喻/场景**：有没有贯穿始终的意象或场景？

---

## Step 3: 生成设计文档和元数据

基于分析结果，遵循 [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) 的四个原则：

### 生成 design.md

创建 `app/[locale]/[article-name]/design.md`，包含：

1. **内容理解**：文章主题、情绪、目标读者
2. **设计直觉**：第一感受、脑海中的画面/颜色
3. **设计方案**：
   - 视觉风格（色彩、字体、视觉元素、风格关键词）
   - 交互设计（列出交互点和实现方式）
   - 沉浸式设计（核心隐喻、导航逻辑、滚动体验）
   - 响应式设计（桌面端和移动端考虑）
4. **技术实现**：核心组件、依赖库、性能考虑

### 生成元数据

准备以下元数据（暂存，待 Step 6 使用）：

```ts
{
  articleName: '[article-name]',
  title: '[中文标题 - AI 总结]',
  description: '[简介 - AI 总结，1-2 句话]',
  tags: ['[标签1]', '[标签2]', ...],  // AI 提取 3-5 个标签
  publishedAt: '[当前日期 YYYY-MM-DD]',
}
```

---

## Step 4: 确认设计方案

向用户展示 design.md 的内容，询问：

- 是否满意设计方案？
- 需要调整哪些地方？

**如果需要调整**：
- 根据用户反馈修改 design.md
- 可以提供多个不同风格的设计方案供选择

**如果满意**：继续下一步

---

## Step 5: 创建文件并实现组件

**⚠️ 文件位置约束（必须严格遵守）**：

```
app/[locale]/[article-name]/           ← 路由层
    ├── page.tsx               # 路由入口
    ├── content.md             # 文章原始内容
    └── design.md              # 设计文档

app/components/[article-name]/         ← 组件层
    ├── index.tsx              # 文章元数据 + 组件导出
    ├── Hero.tsx               # 首页卡片（支持 inHome 模式）
    ├── Content.tsx            # 文章主体内容
    └── *.tsx                  # 其他自定义组件
```

### 5.1 创建路由文件

创建 `app/[locale]/[article-name]/page.tsx`：

```tsx
import Content from '@/app/components/[article-name]/Content'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: '[article-name].metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ArticlePage() {
  return <Content />
}
```

### 5.2 实现文章组件

在 `app/components/[article-name]/` 下，根据 design.md 实现所需组件。

**原则**：
- 遵循 design.md 的设计方案
- 考虑桌面端和移动端响应式
- 交互应该帮助理解内容，不是炫技
- **保留文章原文：禁止为了设计或交互而缩减、修改或删除原文内容（必须 100% 完整）**
- **所有文本内容使用 `useTranslations('[article-name]')` 获取，禁止硬编码**
- **组件顶部添加 `'use client'` 指令（如果使用 useTranslations）**

---

## Step 6: 创建翻译文件（自动发现！）

✨ **好消息**：首页文章列表和 i18n 翻译加载已全面自动化！

### 6.1 自动发现机制

当你在 `app/components/[article-name]/` 中创建新的文章组件文件夹时：

1. **开发或构建时**，脚本 `scripts/generate-articles-list.js` 会自动：
   - 扫描 `app/components/` 下所有包含 `index.tsx/ts` 的文件夹
   - 自动更新 `app/lib/articles-loader.ts` 的文章列表
   - 首页会自动加载和显示新文章（无需手动修改 page.tsx）

2. **i18n 翻译加载自动化**：
   - `i18n/request.ts` 会自动加载所有文章对应的翻译文件
   - 无需手动在 request.ts 中添加导入语句

### 6.2 创建翻译文件

为文章创建独立的翻译文件：

1. 创建 `messages/zh/[article-name].json`（中文翻译）
2. 创建 `messages/en/[article-name].json`（英文翻译，AI自动翻译）

**翻译文件结构规范**：
- ✅ 使用命名对象（`event1`, `event2`, `stage1`）
- ❌ 不使用数组索引（`events.0`, `stages.1`）
- 确保中英文 JSON 结构完全一致

**特殊字符转义规范**（JSON 语法要求）：
- 双引号 `"` → `\"`（必须转义，否则 JSON 解析失败）
- 反斜杠 `\` → `\\`
- 换行符 → `\n`
- 制表符 → `\t`

**示例**：
```json
{
  "quote": "他说：\"这是一个引用\"",
  "path": "C:\\Users\\name",
  "multiline": "第一行\n第二行"
}
```

**标准结构示例**：

```json
{
  "metadata": {
    "title": "文章标题",
    "description": "文章描述"
  },
  "hero": {
    "title": "主标题",
    "subtitle": "副标题"
  },
  "sections": {
    "section1": {
      "title": "第一部分",
      "content": "内容"
    },
    "section2": {
      "title": "第二部分",
      "content": "内容"
    }
  }
}
```

### 6.3 组件中使用翻译

确保所有组件使用翻译而非硬编码文本：

```tsx
'use client'
import { useTranslations } from 'next-intl'

export default function Component() {
  const t = useTranslations('[article-name]')

  return <h1>{t('hero.title')}</h1>  // 不要硬编码中文
}
```

### 6.4 开发时自动扫描

无需额外操作！系统已配置自动扫描：

```bash
# 开发时自动扫描
npm run dev              # 等同于：npm run articles:scan && rm -rf .next && next dev

# 构建时自动扫描
npm run build           # 等同于：npm run articles:scan && next build

# 手动扫描（如需）
npm run articles:scan
```

---

## Step 7: 验收测试

AI 自动执行以下验收流程：

### 7.1 启动开发服务器

使用 Bash 工具启动服务器（如果未启动）：

```bash
npm run dev
```

等待服务器启动完成（显示 "Ready in XXXms"）。服务器启动时会自动运行 `npm run articles:scan`。

### 7.2 验证编译无错误

监听服务器日志，确认：
- [ ] 无编译错误（compile 成功）
- [ ] 无 `MISSING_MESSAGE` 错误
- [ ] 无 `Could not resolve` 错误
- [ ] 脚本正确执行（看到 `✅ 成功扫描文章列表！` 日志）

### 7.3 访问页面验证

分别访问中英文版本，检查翻译是否生效：

1. **首页检查**（重要！）：访问 `/zh` 和 `/en`
   - 文章卡片正常显示（包括新文章）
   - 标题和描述使用了翻译
   - **✅ 关键：点击文章卡片能够成功跳转到文章详情页**
   - 确认 Hero 组件在 `inHome={true}` 时用 `<Link>` 包裹

2. **中文版本**：访问 `http://localhost:3000/zh/[article-name]`
   - 所有文本显示中文
   - 无硬编码英文
   - 交互组件正常工作

3. **英文版本**：访问 `http://localhost:3000/en/[article-name]`
   - 所有文本显示英文
   - 无硬编码中文
   - 交互组件正常工作

### 7.4 完整性与规范检查（必须 100% 遵守）

在提交前，AI 必须对照以下列表进行最后自检：

- [ ] **首页卡片高度**：`inHome={true}` 模式下的 Hero 组件容器是否使用了 `h-[280px]`？（严禁使用 `h-full` 或其他数值）
- [ ] **首页链接包裹**：`inHome={true}` 时，是否使用 `<Link>` 包裹了整个 Hero 内容？
- [ ] **多语言命名空间**：`useTranslations('[article-name]')` 中的 `[article-name]` 是否与文件名及翻译文件名一致？
- [ ] **硬编码检查**：组件内是否存在未通过 `t()` 函数加载的中文/英文文本？
- [ ] **Client 指令**：使用 `useTranslations` 的组件顶部是否有 `'use client'`？
- [ ] **返回按钮**：文章详情页是否有返回首页的按钮或链接？
- [ ] **文件位置**：业务组件（Hero、Content 等）是否都在 `app/components/[article-name]/` 下？路由层是否只有 page.tsx 和 design.md？
- [ ] **自动发现**：新文章是否已在 `app/lib/articles-loader.ts` 中出现？（由脚本自动更新，无需手动修改）

### 7.5 报告验收结果

向用户报告：
- ✅ 所有检查通过，文章创建完成
- ⚠️ 发现问题：[具体错误]，需要修复

**如果有错误**：立即修复后重新验收，不要让用户手动检查。

---

## 注意事项

- **article-name**（文章 URL 名称）必须使用 kebab-case（小写字母 + 连字符）
- **导出命名规范**：`app/components/[article-name]/index.tsx` 必须导出 `[camelCaseArticleName]Article` 对象
  - 例：`world-war-one` → 导出 `worldWarOneArticle`
  - 例：`mnist-neural-network` → 导出 `mnistArticle`
- 所有新建文件必须使用绝对路径
- 遵循 [ARCHITECTURE.md](./ARCHITECTURE.md) 的文件组织规范
- 遵循 [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) 的设计原则
- 优先考虑内容和用户体验，避免过度设计
- **无需手动修改首页配置**：`app/[locale]/page.tsx` 和 `i18n/request.ts` 会自动发现新文章

---

## 自动化系统说明

### 文章自动发现流程

```
1. 创建文件夹: app/components/[article-name]/
                └── index.tsx (导出 Article 对象)
                ├── Hero.tsx
                ├── Content.tsx
                └── ...

2. 创建翻译文件: messages/zh/[article-name].json
                 messages/en/[article-name].json

3. 运行开发或构建命令
   npm run dev          ← 自动执行 articles:scan
   npm run build        ← 自动执行 articles:scan

4. 脚本 scripts/generate-articles-list.js 自动：
   - 扫描 app/components/ 下的所有文章文件夹
   - 更新 app/lib/articles-loader.ts 的 ARTICLE_MODULES 列表
   - 首页自动加载所有已发布文章
   - i18n/request.ts 自动加载对应翻译文件
```

### 核心文件说明

| 文件 | 作用 | 是否手动修改 |
|------|------|-----------|
| `app/lib/articles-loader.ts` | 文章自动加载器 | ❌ 由脚本自动生成 |
| `app/[locale]/page.tsx` | 首页 | ❌ 使用自动加载器，无需手动添加文章 |
| `i18n/request.ts` | i18n 配置 | ❌ 自动加载所有翻译文件 |
| `scripts/generate-articles-list.js` | 自动扫描脚本 | ❌ 仅在更改扫描逻辑时修改 |
| `package.json` | npm 脚本 | ❌ 已配置 `articles:scan` |

---

## 相关文档

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 技术架构
- [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) - 设计规范
- [CLAUDE.md](../CLAUDE.md) - AI 协作入口
