import { useState } from 'react'

import type { PromptResponse } from '@/api/services/virtual-assistant/types'
import ChatHeader from '@/components/chat-header'
import ChatInput from '@/components/chat-input'

const VirtualAssistantPage = () => {
  const [messages, setMessages] = useState<string[]>([])

  const handleNewMessage = (
    userMessage: string,
    aiResponse: PromptResponse
  ) => {
    setMessages((prev) => [...prev, userMessage, aiResponse.message])
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <ChatHeader />
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => {
          const isUser = index % 2 === 0

          return (
            <div
              key={index}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                  isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message}
              </div>
            </div>
          )
        })}
      </div>

      <ChatInput onNewMessage={handleNewMessage} />
    </div>
  )
}

export default VirtualAssistantPage
