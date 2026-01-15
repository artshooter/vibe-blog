/**
 * Query Rewriter - 使用 AI 优化用户查询
 * 
 * 功能：
 * 1. 纠正错别字
 * 2. 澄清用户意图
 * 3. 将口语化表达转为正式表达
 */

export interface RewriteResult {
    originalQuery: string
    rewrittenQuery: string
    wasRewritten: boolean
}

const REWRITE_PROMPT = `你是一个查询优化助手。分析用户的搜索查询，输出优化后的版本以便进行更精准的语义搜索。

优化规则：
1. 纠正明显的错别字和拼写错误（如"博猪"→"博主"）
2. 将口语化、简写表达转为更完整的书面表达
3. 如果问题过于模糊，尝试补充合理的上下文
4. 保持问题的核心语义不变
5. 如果原查询已经很好，直接返回原查询

重要：只输出优化后的查询文本，不要输出任何解释或额外内容。`

export async function rewriteQuery(originalQuery: string): Promise<RewriteResult> {
    const apiKey = process.env.LLM_API_KEY
    const model = process.env.LLM_MODEL || 'Pro/zai-org/GLM-4.7'
    const baseUrl = process.env.LLM_BASE_URL || 'https://api.siliconflow.cn/v1'

    // 如果查询太短，不做重写
    if (originalQuery.trim().length < 2) {
        return {
            originalQuery,
            rewrittenQuery: originalQuery,
            wasRewritten: false
        }
    }

    if (!apiKey) {
        console.warn('[QueryRewriter] LLM_API_KEY not configured, skipping rewrite')
        return {
            originalQuery,
            rewrittenQuery: originalQuery,
            wasRewritten: false
        }
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
                temperature: 0.3,  // 低温度确保输出稳定
                max_tokens: 150,
                stream: false,
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.warn('[QueryRewriter] API error:', response.status, errorText)
            return {
                originalQuery,
                rewrittenQuery: originalQuery,
                wasRewritten: false
            }
        }

        const data = await response.json()
        const rewrittenQuery = data.choices?.[0]?.message?.content?.trim()

        if (!rewrittenQuery) {
            return {
                originalQuery,
                rewrittenQuery: originalQuery,
                wasRewritten: false
            }
        }

        // 检查是否实际做了修改
        const wasRewritten = rewrittenQuery !== originalQuery

        return {
            originalQuery,
            rewrittenQuery,
            wasRewritten,
        }
    } catch (error) {
        console.error('[QueryRewriter] Error:', error)
        return {
            originalQuery,
            rewrittenQuery: originalQuery,
            wasRewritten: false
        }
    }
}
