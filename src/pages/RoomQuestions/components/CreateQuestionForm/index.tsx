import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreateQuestion } from '@/services/questions'

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'Pergunta deve ter menos de 500 caracteres'),
})

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>

interface QuestionFormProps {
  roomId: string
}

export const QuestionForm = ({ roomId }: QuestionFormProps) => {
  const { mutateAsync: createQuestion } = useCreateQuestion()

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  })

  const { isSubmitting } = form.formState

  const handleCreateQuestion = useCallback(
    async ({ question }: CreateQuestionFormData) => {
      await createQuestion({ roomId, question })
      form.reset()
    },
    [createQuestion, form, roomId]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Pergunta</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      disabled={isSubmitting}
                      placeholder="O que você gostaria de saber?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Enviando...' : 'Enviar pergunta'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
