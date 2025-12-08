import { SendHorizonal } from 'lucide-react'
import { toast } from 'sonner'

import { usePromptVirtualAssistant } from '@/forms/hooks/virtual-assistant'

import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

const ChatInput = () => {
  const { form, handleSubmit } = usePromptVirtualAssistant({
    onSuccess: () => {
      toast.success('Mensagem enviada para o assistente')
      form.reset()
    },
    onError: () => {
      toast.error('Erro ao enviar mensagem para o assistente')
    },
  })
  return (
    <div className="shrink-0 border-t bg-background px-4 py-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Faça uma pergunta sobre sustentabilidade e reciclagem..."
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            disabled={form.formState.isSubmitting}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChatInput
