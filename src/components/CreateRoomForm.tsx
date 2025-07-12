import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { useCreateRoom } from '@/services/rooms'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const nameMinChars = 3

const createRoomSchema = z.object({
  name: z.string().min(nameMinChars, {
    message: `Inclua no mínimo ${nameMinChars} caracteres`,
  }),
  description: z.string(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>

export const CreateRoomForm = () => {
  const createRoom = useCreateRoom()

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const handleCreateRoom = useCallback(
    async ({ name, description }: CreateRoomFormData) => {
      await createRoom({ name, description })
      createRoomForm.reset()
    },
    [createRoom, createRoomForm]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da sala</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome da sala" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
