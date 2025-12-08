import { Leaf } from 'lucide-react'

const ChatHeader = () => {
  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-green-100 p-2">
          <Leaf className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Assistente Virtual
          </h1>
          <p className="text-sm text-muted-foreground">
            Seu aliado em sustentabilidade e reciclagem
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
