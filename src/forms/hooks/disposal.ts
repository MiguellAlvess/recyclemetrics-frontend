import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createDisposalSchema } from '../schemas/disposal'

export const useCreateDisposalForm = () => {
  const form = useForm({
    resolver: zodResolver(createDisposalSchema),
    defaultValues: {
      disposalProduct: '',
      materialType: undefined,
      quantity: 1,
      destination: undefined,
      disposalDate: undefined,
    },
    shouldUnregister: true,
  })

  return { form }
}
