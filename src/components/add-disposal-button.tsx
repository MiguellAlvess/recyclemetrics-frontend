import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Apple,
  CupSoda,
  HeartHandshake,
  Loader2Icon,
  Plus,
  Recycle,
  RefreshCwOff,
  Sprout,
  StickyNote,
  Trash2,
  Weight,
  Wine,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { DisposalService } from '@/api/services/disposal/disposal'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateDisposalForm } from '@/forms/hooks/disposal'
import type { CreateDisposalSchema } from '@/forms/schemas/disposal'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const AddDisposalButton = () => {
  const { form } = useCreateDisposalForm()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { mutateAsync: createDisposal } = useMutation({
    mutationKey: ['createDisposal'],
    mutationFn: (data: CreateDisposalSchema) => DisposalService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposals'] })
    },
  })

  const handleSubmit = async (data: CreateDisposalSchema) => {
    try {
      await createDisposal(data)
      toast.success('Descarte adicionado com sucesso!')
      setDialogIsOpen(false)
      form.reset()
    } catch (error) {
      toast.error('Erro ao adicionar descarte. Tente novamente.')
      console.error(error)
    }
  }

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Adicionar descarte
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Adicionar resíduo</DialogTitle>
            <DialogDescription>
              Insira os detalhes do resíduo que deseja descartar
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="disposalProduct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome do produto a ser descartado"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="materialType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo do material</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          type="button"
                          variant={
                            field.value === 'PLASTIC' ? 'selected' : 'outline'
                          }
                          onClick={() => field.onChange('PLASTIC')}
                        >
                          <CupSoda />
                          Plástico
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'METAL' ? 'selected' : 'outline'
                          }
                          onClick={() => field.onChange('METAL')}
                        >
                          <Weight />
                          Metal
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'GLASS' ? 'default' : 'outline'
                          }
                          onClick={() => field.onChange('GLASS')}
                        >
                          <Wine />
                          Vidro
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'PAPER' ? 'default' : 'outline'
                          }
                          onClick={() => field.onChange('PAPER')}
                        >
                          <StickyNote />
                          Papel
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === 'ORGANIC' ? 'default' : 'outline'
                          }
                          onClick={() => field.onChange('ORGANIC')}
                        >
                          <Apple />
                          Orgânico
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === 'NOT_RECYCLABLE'
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() => field.onChange('NOT_RECYCLABLE')}
                        >
                          <RefreshCwOff />
                          Não reciclável
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          type="button"
                          variant={
                            field.value === 'RECYCLING' ? 'selected' : 'outline'
                          }
                          onClick={() => field.onChange('RECYCLING')}
                        >
                          <Recycle />
                          Reciclagem
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'COMPOSTING'
                              ? 'selected'
                              : 'outline'
                          }
                          onClick={() => field.onChange('COMPOSTING')}
                        >
                          <Sprout />
                          Compostagem
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'WASTE' ? 'selected' : 'outline'
                          }
                          onClick={() => field.onChange('WASTE')}
                        >
                          <Trash2 />
                          Rejeito
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'DONATION' ? 'selected' : 'outline'
                          }
                          onClick={() => field.onChange('DONATION')}
                        >
                          <HeartHandshake />
                          Doação
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      {/* @ts-expect-error - value is a number */}
                      <Input
                        type="number"
                        {...field}
                        placeholder="Digite a quantidade"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disposalDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Digite a data que o resíduo foi gerado"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:space-x-4">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full"
                  variant="secondary"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddDisposalButton
