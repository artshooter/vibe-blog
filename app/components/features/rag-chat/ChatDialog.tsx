'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageItem from './MessageItem'
import ChatInput from './ChatInput'
import type { Message, StreamData, Source } from './types'

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // 检测用户是否手动滚动离开了底部
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current
    if (!container) return

    // 如果用户滚动到距离底部 50px 以内，认为在底部
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50
    setShouldAutoScroll(isAtBottom)
  }, [])

  // 只有当 shouldAutoScroll 为 true 时才自动滚动
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom()
    }
  }, [messages, shouldAutoScroll, scrollToBottom])

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    // 用户发送新消息时，自动滚动到底部
    setShouldAutoScroll(true)

    const assistantId = (Date.now() + 1).toString()
    let sources: Source[] = []

    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      },
    ])

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: content }),
      })

      if (!response.ok) {
        throw new Error('请求失败')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('无法读取响应')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === 'data: [DONE]') continue
          if (!trimmed.startsWith('data: ')) continue

          try {
            const data: StreamData = JSON.parse(trimmed.slice(6))

            if (data.type === 'metadata') {
              sources = data.sources
            } else if (data.type === 'content') {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId
                    ? { ...msg, content: msg.content + data.content }
                    : msg
                )
              )
            } else if (data.type === 'error') {
              throw new Error(data.error)
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }

      // Finalize message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, isStreaming: false, sources }
            : msg
        )
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '发生错误'
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: `抱歉，${errorMessage}`, isStreaming: false }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-50 flex h-[70vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 md:bottom-24 md:right-6 md:h-[500px] md:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                与博客对话
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                aria-label="关闭"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4"
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-neutral-100 p-4 dark:bg-neutral-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-400"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    问我任何关于博客内容的问题
                  </p>
                  <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                    例如：你对工作的看法是什么？
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
