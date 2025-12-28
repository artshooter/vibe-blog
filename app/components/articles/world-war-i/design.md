
# Article Design Analysis: World War I

## 1. Content Analysis (内容理解)

- **Theme**: Historical conflict, global tragedy, timeline of escalation, systemic collapse, and aftermath.
- **Mood**: Solemn, heavy, gritty, industrial, momentous.
- **Key Narrative Arc**:
  1.  **The Spark**: A singular event triggering a chain reaction.
  2.  **The Escalation**: Domino effect of alliances.
  3.  **The Grind**: Stalemate and industrial slaughter.
  4.  **The Turning Point & End**: Shifts in power and collapse.
  5.  **The Scars**: Lasting impact on the world.
- **Target Audience**: General readers interested in history, looking for a clear, atmospheric explanation of a complex event.

## 2. Design Intuition (设计直觉)

- **Colors**:
  - Primary: Desaturated earthy tones — Mud brown, trench grey, dried blood red (dark maroon).
  - Accent: Old paper beige/yellow for text, gunmetal blue for steel/cold elements.
  - Background: Dark, textured (noise or paper grain), possibly referencing old maps or trench photography style (black & white, high contrast).
- **Typography**:
  - Headings: Serif font with a "printed press" or "monumental" feel (e.g., Playfair Display, Cinzel).
  - Body: Readable serif or clean sans-serif (e.g., Inter, Merriweather) for legibility against the heavy mood.
- **Visual Metaphor**: "The Dominoes Falling" (for the start) and "The meat grinder" (for the process). A timeline that feels like a fuse burning.

## 3. Design Proposal (设计方案)

### Visual Style (视觉风格)
- **Glassmorphism?** No, too modern. Use "Paper-morphism" or "Industrial Realism" — borders, lines, noise, sepia overlay.
- **Layout**: Center column for text, but break out for timelines and maps.

### Interactive Components (交互设计)

1.  **interactive-timeline (The Spark to Outbreak)**
    - **Goal**: Visualize the rapid escalation from June 28 to August 4.
    - **Interaction**: Vertical scroll triggers highlighting of dates/events. As you scroll, a line connects the specific country reactions (like a fuse).
    - **Items**: Sarajevo -> German Support -> Ultimatum -> War Declarations.

2.  **war-phase-cards (The Process)**
    - **Goal**: Distinctly separate the four phases (1914, 1915-16, 1917, 1918).
    - **Interaction**: A tabbed view or horizontal slider.
    - **Visual**: Each card features a background image (e.g., soldiers in trenches, tanks, armistice) representing the era.

3.  **impact-grid (The Aftermath)**
    - **Goal**: Summarize Political, Economic, and Social impacts.
    - **Interaction**: Hover effects on grid items to reveal more detail or subtle animation (e.g., map crumbling for political empires).

### Immersive Elements (沉浸式设计)
- **Hero Section**: A dramatic title "The Great War" with a background video or subtle parallax of a battlefield map/trench.
- **Quotes**: Blockquotes should look like telegrams or typewriter text on paper scraps.

## 4. Technical Implementation (技术实现)

- **Framework**: React / Next.js
- **Styling**: Tailwind CSS (custom colors in `tailwind.config.ts` might be needed, or arbitrary values).
- **Animation**: Framer Motion for scroll-triggered timeline lines and fade-ins.
- **Components to Build**:
  - `Timeline`: Custom vertical list with connecting lines.
  - `PhaseTabs`: State-controlled display of detailed content.
  - `ImpactGrid`: Responsive grid layout.
  - `QuoteBlock`: Styled typography component.

## 5. Metadata

```ts
export const meta = {
  slug: 'world-war-i',
  title: '第一次世界大战',
  description: '1914-1918：一场重塑世界秩序的全球性军事冲突。从萨拉热窝的枪声到凡尔赛的合约，回顾人类历史的至暗时刻。',
  tags: ['History', 'War', 'Humanity'],
  publishedAt: '2025-12-28',
}
```
