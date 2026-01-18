'use client'

import ReactMarkdown from 'react-markdown'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import type { Message, Source } from './types'

interface MessageItemProps {
  message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user'

  // Deduplicate sources based on slug
  const uniqueSources = message.sources?.reduce((acc: Source[], current) => {
    const isDuplicate = acc.some(item =>
      // Prefer slug for uniqueness, fallback to title if fallback is needed
      (current.slug && item.slug === current.slug) ||
      (!current.slug && item.title === current.title)
    )
    if (!isDuplicate) {
      acc.push(current)
    }
    return acc
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${isUser
          ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
          : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
          }`}
      >
        <div className="text-sm leading-relaxed">
          <div className={`prose max-w-none break-words ${isUser
            ? 'prose-invert'
            : 'dark:prose-invert'
            }`}>
            <ReactMarkdown
              components={{
                // Custom link component to handle external/internal links if needed,
                // for now default is fine but we can enforce styles
                a: ({ node, ...props }) => (
                  <a {...props} className="font-medium underline underline-offset-4" target="_blank" rel="noopener noreferrer" />
                ),
                p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-2 last:mb-0" />,
                ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 mb-2 last:mb-0" />,
                code: ({ node, ...props }) => <code {...props} className="bg-neutral-200 dark:bg-neutral-800 rounded px-1 py-0.5 text-sm font-mono" />,
                pre: ({ node, ...props }) => <pre {...props} className="bg-neutral-200 dark:bg-neutral-800 rounded p-2 mb-2 overflow-x-auto text-sm font-mono" />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          {message.isStreaming && (
            <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-current" />
          )}
        </div>

        {uniqueSources && uniqueSources.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 border-t border-neutral-200 pt-3 dark:border-neutral-700">
            {uniqueSources.map((source, index) => (
              <Link
                key={index}
                href={source.slug ? `/${source.slug}` : '#'}
                className="inline-flex items-center gap-1 rounded-full bg-neutral-200 px-2 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {source.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
