import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { usePrompt } from '@/api/hooks/virtual-assistant'
import type { PromptResponse } from '@/api/services/virtual-assistant/types'

import {
  type AddPromptSchema,
  addPromptSchema,
} from '../schemas/virtual-assistant'

type AddPromptFormParams = {
  onSuccess?: (userMessage: string, response: PromptResponse) => void
  onError?: () => void
}

export const usePromptVirtualAssistant = ({
  onSuccess,
  onError,
}: AddPromptFormParams) => {
  const { mutateAsync: addPrompt } = usePrompt()

  const form = useForm<AddPromptSchema>({
    resolver: zodResolver(addPromptSchema),
    defaultValues: {
      message: '',
    },
    shouldUnregister: true,
  })

  const handleSubmit = async (data: AddPromptSchema) => {
    try {
      const userMessage = data.message
      const response = await addPrompt(data)
      onSuccess?.(userMessage, response)
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return { form, handleSubmit }
}
