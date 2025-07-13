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
    onSuccess: (_, { roomId }) => {
      queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
    },
  })
}
