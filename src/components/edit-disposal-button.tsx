import { ExternalLinkIcon } from 'lucide-react'
import {
  Apple,
  CupSoda,
  HeartHandshake,
  Loader2Icon,
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

import type { CreateDisposalResponse } from '@/api/services/disposal/types'
import { useEditDisposalForm } from '@/forms/hooks/disposal'

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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

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

type EditDisposalButtonProps = {
  disposal: CreateDisposalResponse
}

const EditDisposalButton = ({ disposal }: EditDisposalButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const { form, onSubmit } = useEditDisposalForm({
    disposal,
    onSuccess: () => {
      setSheetIsOpen(false)
      toast.success('Descarte atualizado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao atualizar o descarte')
    },
  })
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[450px]">
        <SheetTitle>Editar descarte</SheetTitle>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            <SheetFooter className="sm:space-x-4">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="w-full"
                variant="secondary"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditDisposalButton
