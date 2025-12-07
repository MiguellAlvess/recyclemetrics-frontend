import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { UpdateUserResponse } from '@/api/services/user/types'
import { useEditUserForm } from '@/forms/hooks/user'

import PasswordInput from './password-input'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

type UpdateUserFormProps = {
  user: UpdateUserResponse
}

const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const { form, handleSubmit } = useEditUserForm({
    user,
    onSuccess: () => {
      toast.success('Usuário atualizado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao atualizar o usuário')
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Digite sua nova senha (opcional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a nova senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirme sua nova senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Salvar alterações
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateUserForm
