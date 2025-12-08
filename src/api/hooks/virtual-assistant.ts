import { useMutation } from '@tanstack/react-query'

import type { PromptInput } from '../services/virtual-assistant/types'
import { VirtualAssistantService } from '../services/virtual-assistant/virtual-assistant'

export const usePrompt = () => {
  return useMutation({
    mutationKey: ['prompt'],
    mutationFn: async (variables: PromptInput) => {
      return VirtualAssistantService.prompt(variables)
    },
  })
}
