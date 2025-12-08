import ChatHeader from '@/components/chat-header'
import ChatInput from '@/components/chat-input'

const VirtualAssistantPage = () => {
  return (
    <div className="flex h-full flex-col bg-background">
      <ChatHeader />

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* mensagens futuramente */}
      </div>

      {/* Input fixo embaixo */}
      <ChatInput />
    </div>
  )
}

export default VirtualAssistantPage
