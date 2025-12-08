import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { usePrompt } from '@/api/hooks/virtual-assistant'

import {
  type AddPromptSchema,
  addPromptSchema,
} from '../schemas/virtual-assistant'

type AddPurchaseFormParams = {
  onSuccess?: () => void
  onError?: () => void
}

export const usePromptVirtualAssistant = ({
  onSuccess,
  onError,
}: AddPurchaseFormParams) => {
  const { mutateAsync: addPrompt } = usePrompt()
  const form = useForm({
    resolver: zodResolver(addPromptSchema),
    defaultValues: {
      message: '',
    },
    shouldUnregister: true,
  })

  const handleSubmit = async (data: AddPromptSchema) => {
    try {
      await addPrompt(data)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return { form, handleSubmit }
}
