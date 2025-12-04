import { zodResolver } from '@hookform/resolvers/zod'
import {
  Apple,
  GlassWater,
  Notebook,
  Plus,
  StickyNote,
  Trash,
  Weight,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

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

const disposalSchema = z.object({
  material: z.enum([
    'PLASTIC',
    'PAPER',
    'GLASS',
    'ORGANIC',
    'METAL',
    'NOT_RECYCLABLE',
  ]),
  quantity: z.number().min(1, 'A quantidade é obrigatória'),
  unit: z.string().min(1, 'A unidade é obrigatória'),
  destination: z.enum(['RECYCLABLE', 'DONATION', 'REJECT', 'COMPOST']),
  date: z.date({
    message: 'A data é obrigatória',
  }),
})

export type Disposal = z.infer<typeof disposalSchema>

const AddDisposalButton = () => {
  const form = useForm({
    resolver: zodResolver(disposalSchema),
    defaultValues: {
      material: undefined,
      quantity: 1,
      unit: '',
      destination: 'RECYCLABLE',
      date: undefined,
    },
    shouldUnregister: true,
  })

  const handleSubmit = (data: Disposal) => {
    console.log(data)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Adicionar resíduo
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
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo do material</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          type="button"
                          variant={
                            field.value === 'PLASTIC' ? 'secondary' : 'outline'
                          }
                          onClick={() => field.onChange('PLASTIC')}
                        >
                          <Notebook />
                          Plástico
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'METAL' ? 'secondary' : 'outline'
                          }
                          onClick={() => field.onChange('METAL')}
                        >
                          <Weight />
                          Metal
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'GLASS' ? 'secondary' : 'outline'
                          }
                          onClick={() => field.onChange('GLASS')}
                        >
                          <GlassWater />
                          Vidro
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === 'PAPER' ? 'secondary' : 'outline'
                          }
                          onClick={() => field.onChange('PAPER')}
                        >
                          <StickyNote />
                          Papel
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === 'ORGANIC' ? 'secondary' : 'outline'
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
                              ? 'secondary'
                              : 'outline'
                          }
                          onClick={() => field.onChange('NOT_RECYCLABLE')}
                        >
                          <Trash />
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite a quantidade de resíduo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite a unidade de medida do resíduo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
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
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full" variant="secondary">
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
