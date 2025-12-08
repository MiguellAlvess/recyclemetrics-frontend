import { protectedApi } from '@/lib/axios'

import type { PromptInput, PromptResponse } from './types'

export const VirtualAssistantService = {
  prompt: async (input: PromptInput): Promise<PromptResponse> => {
    const response = await protectedApi.post('/virtual-assistant/prompt', input)
    return response.data
  },
}
