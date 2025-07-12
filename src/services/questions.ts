import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'

export const useQuestions = (roomId: string) => {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const res = await api.questions.get(roomId)
      return await (res.json() as Promise<GetQuestionsApiResponse>)
    },
    enabled: !!roomId,
  })
}

export const useCreateQuestion = (roomId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateQuestionApiRequest) => {
      const response = await api.questions.create(roomId, data)

      return response.json() as Promise<CreateQuestionApiResponse>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
    },
  }).mutateAsync
}
