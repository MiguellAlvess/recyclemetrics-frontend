import { Sparkles } from 'lucide-react'

import { Button } from './ui/button'

const SUGGESTIONS = [
  'Como posso reduzir meu consumo de plástico?',
  'Quais são as melhores práticas de reciclagem?',
  'Como fazer compras sustentáveis?',
  'Quais sao os beneficios da reciclagem?',
]

interface ChatSuggestionsProps {
  onSelect: (message: string) => void
}

const ChatSuggestions = ({ onSelect }: ChatSuggestionsProps) => {
  return (
    <div className="mb-3 space-y-2">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Sparkles className="h-3 w-3 text-emerald-500" />
        <span>Sugestões</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((text) => (
          <Button
            key={text}
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-muted-foreground/20 bg-muted/40 text-xs font-normal hover:bg-muted"
            onClick={() => onSelect(text)}
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ChatSuggestions
