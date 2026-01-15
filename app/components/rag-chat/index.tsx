'use client'

import { useState } from 'react'
import ChatButton from './ChatButton'
import ChatDialog from './ChatDialog'

export default function RagChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <ChatDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
