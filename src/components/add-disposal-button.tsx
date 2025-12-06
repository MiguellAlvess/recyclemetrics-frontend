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

import { EnumButtonGroup, type EnumOption } from './enum-button-group'
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

export const materialTypeOptions: EnumOption[] = [
  { value: 'PLASTIC', label: 'Plástico', icon: <CupSoda /> },
  { value: 'METAL', label: 'Metal', icon: <Weight /> },
  { value: 'GLASS', label: 'Vidro', icon: <Wine /> },
  { value: 'PAPER', label: 'Papel', icon: <StickyNote /> },
  { value: 'ORGANIC', label: 'Orgânico', icon: <Apple /> },
  { value: 'NOT_RECYCLABLE', label: 'Não reciclável', icon: <RefreshCwOff /> },
]

export const destinationOptions: EnumOption[] = [
  { value: 'RECYCLING', label: 'Reciclagem', icon: <Recycle /> },
  { value: 'COMPOSTING', label: 'Compostagem', icon: <Sprout /> },
  { value: 'WASTE', label: 'Rejeito', icon: <Trash2 /> },
  { value: 'DONATION', label: 'Doação', icon: <HeartHandshake /> },
]

const AddDisposalButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const { form, handleSubmit } = useCreateDisposalForm({
    onSuccess: () => {
      setDialogIsOpen(false)
      toast.success('Descarte adicionado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao adicionar descarte')
    },
  })

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
                      <EnumButtonGroup
                        value={field.value}
                        onChange={field.onChange}
                        options={materialTypeOptions}
                      />
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
                      <EnumButtonGroup
                        value={field.value}
                        onChange={field.onChange}
                        options={destinationOptions}
                      />
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
