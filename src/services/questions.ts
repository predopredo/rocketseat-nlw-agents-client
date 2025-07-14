import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'

export const useQuestions = (roomId: string) => {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const res = await api.questions.get(roomId)
      return await (res.json() as Promise<GetQuestionsApiResponse>)
    },
    enabled: Boolean(roomId),
  })
}

export const useCreateQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ roomId, question }: CreateQuestionApiRequest) => {
      const response = await api.questions.create(roomId, question)

      return response.json() as Promise<CreateQuestionApiResponse>
    },
    onMutate: ({ roomId, question }) => {
      const questions = queryClient.getQueryData<GetQuestionsApiResponse>([
        'get-questions',
        roomId,
      ])

      const existingQuestions = questions ?? []

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isAnswered: false,
      }

      queryClient.setQueryData<GetQuestionsApiResponse>(
        ['get-questions', roomId],
        [newQuestion, ...existingQuestions]
      )

      return { newQuestion, questions }
    },
    onSuccess: (data, { roomId }, context) => {
      queryClient.setQueryData<GetQuestionsApiResponse>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) {
            return questions
          }

          if (!context?.newQuestion) {
            return questions
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.id,
                answer: data.answer,
                isAnswered: true,
              }
            }

            return question
          })
        }
      )
    },
    onError(_data, { roomId }, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetQuestionsApiResponse>(
          ['get-questions', roomId],
          context.questions
        )
      }
    },
  })
}
