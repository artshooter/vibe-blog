# 文章创作流程 SOP

本文档是给 AI 使用的操作指南。当用户说"创建一篇新文章"时，按照以下流程执行。

---

## Step 1: 获取文章内容

询问用户获取内容的方式：

### 方式 A：用户已有文档
1. 询问用户文件路径
2. 使用 Read 工具读取文件
3. 根据内容生成 slug（文章的 URL 名称）：
   - 如果内容有明确标题 → 使用标题的英文版（kebab-case）
   - 如果没有标题 → 根据主题自行拟定英文名称
4. 创建 `app/[locale]/[slug]/content.md`
5. 将读取的内容写入 content.md

### 方式 B：用户直接提供内容
1. 提示用户直接粘贴文章内容
2. 用户粘贴后，根据内容生成 slug（同上规则）
3. 创建 `app/[locale]/[slug]/content.md`
4. 将用户提供的内容写入 content.md

**slug 规则**：小写英文字母 + 连字符，例如 `atomic-habits`、`my-resume`

---

## Step 2: 分析文章内容

读取 `app/[locale]/[slug]/content.md`，分析以下内容：

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
  slug: '[slug]',
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
app/[locale]/[slug]/           ← 路由层（路由 + 内容源文件）
    ├── page.tsx               # 路由入口，组织页面结构
    ├── content.md             # 文章原始内容
    └── design.md              # 设计文档

app/components/[slug]/         ← 组件层（所有业务组件）
    ├── index.tsx              # 文章注册导出
    ├── Hero.tsx               # 首页卡片 & 详情页头图
    ├── HeroCompact.tsx        # 紧凑版头图（可选）
    ├── Content.tsx            # 文章主体内容
    └── *.tsx                  # 其他自定义组件
```

**禁止**：在 `app/[locale]/[slug]/` 下创建业务组件（Hero、Content 等）
**禁止**：在 `app/components/[slug]/` 下创建 page.tsx

### 5.1 创建路由文件

创建 `app/[locale]/[slug]/page.tsx`：

```tsx
import { getTranslations } from 'next-intl/server'
// 根据 design.md 引入需要的组件

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: '[slug].metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <main>
      {/* 根据 design.md 组织内容 */}
    </main>
  )
}
```

### 5.2 创建封面组件

创建 `app/[locale]/[slug]/Cover.tsx`：

```tsx
interface CoverProps {
  meta: {
    slug: string
    title: string
    description: string
    tags: string[]
    publishedAt: string
  }
}

export default function Cover({ meta }: CoverProps) {
  return (
    <div>
      {/* 根据 design.md 实现封面设计 */}
      <h2>{meta.title}</h2>
      <p>{meta.description}</p>
    </div>
  )
}
```

**重要提示**：确保 Hero 组件支持首页点击跳转
- Hero 组件需要接受 `inHome?: boolean` 参数
- 当 `inHome={true}` 时，必须用 `<Link href="/[slug]">` 包裹整个内容
- 参考示例：
```tsx
import { Link } from '@/i18n/navigation'

export default function Hero({ inHome = false }: { inHome?: boolean }) {
  const content = <section>...</section>

  if (inHome) {
    return <Link href="/[slug]" className="block">{content}</Link>
  }

  return content
}
```

### 5.3 实现文章组件

在 `app/components/[slug]/` 下，根据 design.md 实现所需组件。

**原则**：
- 遵循 design.md 的设计方案
- 考虑桌面端和移动端响应式
- 交互应该帮助理解内容，不是炫技
- **所有文本内容使用 `useTranslations('[slug]')` 获取，禁止硬编码**
- **组件顶部添加 `'use client'` 指令（如果使用 useTranslations）**

---

## Step 6: 添加到文章列表

打开 `app/data/articles.ts`，将 Step 3 生成的元数据对象添加到数组中：

```ts
export const articles = [
  // ... 现有文章
  {
    slug: '[新文章 slug]',
    title: '[标题]',
    description: '[简介]',
    tags: ['[标签1]', '[标签2]'],
    publishedAt: '[日期]',
  }
]
```

---

## Step 7: 创建翻译文件并配置 i18n

### 7.1 创建翻译文件

为文章创建独立的翻译文件：

1. 创建 `messages/zh/[slug].json`（中文翻译）
2. 创建 `messages/en/[slug].json`（英文翻译，AI自动翻译）

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

**示例**：

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

### 7.2 更新 i18n 配置

**关键步骤**：编辑 `i18n/request.ts`，添加新文章的翻译加载：

```typescript
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  const commonMessages = (await import(`@/messages/${locale}/common.json`)).default
  const [slug]Messages = (await import(`@/messages/${locale}/[slug].json`)).default  // 添加这行

  return {
    locale,
    messages: {
      ...commonMessages,
      '[slug]': [slug]Messages,  // 添加这行
    },
  }
})
```

**检查清单**：
- [ ] 创建了 messages/zh/[slug].json
- [ ] 创建了 messages/en/[slug].json
- [ ] 在 i18n/request.ts 中导入新翻译文件
- [ ] 在 messages 对象中添加了新的 namespace

### 7.3 组件中使用翻译

确保所有组件使用翻译而非硬编码文本：

```tsx
'use client'
import { useTranslations } from 'next-intl'

export default function Component() {
  const t = useTranslations('[slug]')

  return <h1>{t('hero.title')}</h1>  // 不要硬编码中文
}
```

---

## Step 8: 验收测试

AI 自动执行以下验收流程：

### 8.1 启动开发服务器

使用 Bash 工具启动服务器（如果未启动）：

```bash
pnpm dev
```

等待服务器启动完成（显示 "Ready in XXXms"）。

### 8.2 验证编译无错误

监听服务器日志，确认：
- [ ] 无编译错误（compile 成功）
- [ ] 无 `MISSING_MESSAGE` 错误
- [ ] 无 `Could not resolve` 错误

### 8.3 访问页面验证

分别访问中英文版本，检查翻译是否生效：

1. **首页检查**（重要！）：访问 `/zh` 和 `/en`
   - 文章卡片正常显示
   - 标题和描述使用了翻译
   - **✅ 关键：点击文章卡片能够成功跳转到文章详情页**
   - 确认 Hero 组件在 `inHome={true}` 时用 `<Link>` 包裹

2. **中文版本**：访问 `http://localhost:3000/zh/[slug]`
   - 所有文本显示中文
   - 无硬编码英文
   - 交互组件正常工作

3. **英文版本**：访问 `http://localhost:3000/en/[slug]`
   - 所有文本显示英文
   - 无硬编码中文
   - 交互组件正常工作

### 8.4 完整性与规范检查（必须 100% 遵守）

在提交前，AI 必须对照以下列表进行最后自检：

- [ ] **首页卡片高度**：`inHome={true}` 模式下的 Hero 组件容器是否使用了 `h-[400px]`？（严禁使用 `h-full` 或其他数值）
- [ ] **首页链接包裹**：`inHome={true}` 时，是否使用 `<Link>` 包裹了整个 Hero 内容？
- [ ] **多语言命名空间**：`useTranslations('[slug]')` 中的 `[slug]` 是否与文件名及 i18n 配置一致？
- [ ] **硬编码检查**：组件内是否存在未通过 `t()` 函数加载的中文/英文文本？
- [ ] **Client 指令**：使用 `useTranslations` 的组件顶部是否有 `'use client'`？
- [ ] **返回按钮**：文章详情页是否有返回首页的按钮或链接？
- [ ] **文件位置**：业务组件（Hero、Content 等）是否都在 `app/components/[slug]/` 下？路由层是否只有 page.tsx 和 design.md？

### 8.5 报告验收结果

向用户报告：
- ✅ 所有检查通过，文章创建完成
- ⚠️ 发现问题：[具体错误]，需要修复

**如果有错误**：立即修复后重新验收，不要让用户手动检查。

---

## 注意事项

- slug（文章 URL 名称）必须使用 kebab-case（小写字母 + 连字符）
- 所有新建文件必须使用绝对路径
- 遵循 [ARCHITECTURE.md](./ARCHITECTURE.md) 的文件组织规范
- 遵循 [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) 的设计原则
- 优先考虑内容和用户体验，避免过度设计

---

## 相关文档

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 技术架构
- [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) - 设计规范
- [CLAUDE.md](../CLAUDE.md) - AI 协作入口
