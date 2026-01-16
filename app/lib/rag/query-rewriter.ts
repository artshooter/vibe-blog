/**
 * Query Rewriter - 使用 AI 进行查询扩展
 *
 * 功能：
 * 1. 生成多个查询变体，提高召回率
 * 2. 保留专有名词和项目名
 * 3. 纠正错别字
 */

export interface RewriteResult {
    originalQuery: string
    rewrittenQuery: string
    expandedQueries: string[]  // 多个查询变体
    wasRewritten: boolean
}

const REWRITE_PROMPT = `你是博客搜索助手。生成 3-4 个搜索查询变体来提高召回率。

原则：
1. 保留专有名词（项目名、作品名可能就是文章标题）
2. 提取核心关键词，去掉疑问词
3. 不要过度解读或替换词语

输出：每行一个查询，不要编号和解释。`

export async function rewriteQuery(originalQuery: string): Promise<RewriteResult> {
    const apiKey = process.env.LLM_API_KEY
    const model = process.env.LLM_MODEL || 'Pro/zai-org/GLM-4.7'
    const baseUrl = process.env.LLM_BASE_URL || 'https://api.siliconflow.cn/v1'

    const defaultResult: RewriteResult = {
        originalQuery,
        rewrittenQuery: originalQuery,
        expandedQueries: [originalQuery],
        wasRewritten: false
    }

    // 如果查询太短，不做重写
    if (originalQuery.trim().length < 2) {
        return defaultResult
    }

    if (!apiKey) {
        console.warn('[QueryRewriter] LLM_API_KEY not configured, skipping rewrite')
        return defaultResult
    }

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages: [
                    { role: 'system', content: REWRITE_PROMPT },
                    { role: 'user', content: originalQuery }
                ],
                temperature: 0.3,
                max_tokens: 200,
                stream: false,
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.warn('[QueryRewriter] API error:', response.status, errorText)
            return defaultResult
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content?.trim()

        if (!content) {
            return defaultResult
        }

        // 解析多行输出为查询数组
        const expandedQueries = content
            .split('\n')
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0 && !line.startsWith('-'))

        // 确保原查询也在列表中（去重）
        if (!expandedQueries.includes(originalQuery)) {
            expandedQueries.unshift(originalQuery)
        }

        console.log('[QueryRewriter] Expanded queries:', expandedQueries)

        return {
            originalQuery,
            rewrittenQuery: expandedQueries[0] || originalQuery,
            expandedQueries,
            wasRewritten: expandedQueries.length > 1 || expandedQueries[0] !== originalQuery,
        }
    } catch (error) {
        console.error('[QueryRewriter] Error:', error)
        return defaultResult
    }
}
