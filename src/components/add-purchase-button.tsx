import {
  Apple,
  CupSoda,
  Loader2Icon,
  Plus,
  RefreshCwOff,
  StickyNote,
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
import { useCreatePurchaseForm } from '@/forms/hooks/purchase'

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

const AddPurchaseButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const { form, handleSubmit } = useCreatePurchaseForm({
    onSuccess: () => {
      setDialogIsOpen(false)
      toast.success('Compra adicionado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao adicionar compra')
    },
  })

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Adicionar compra
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Adicionar compra</DialogTitle>
            <DialogDescription>Insira os detalhes da compra</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="purchaseProduct"
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
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecione a data da compra"
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

export default AddPurchaseButton
