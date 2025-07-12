import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const useQuestionsApi = () => {
  const queryClient = useQueryClient()
  const [roomId, setRoomId] = useState<string | undefined>()
  const [question, setQuestion] = useState<string | undefined>()

  const getQuestionsQuery = useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: () => {
      if (!roomId) {
        throw new Error('roomId required')
      }
      return fetch(`http://localhost:3333/rooms/${roomId}/questions`).then(
        (res) => res.json() as Promise<GetQuestionsApiResponse>
      )
    },
    enabled: !!roomId,
  })

  const getQuestions = (id: string) => {
    setRoomId(id)
    return getQuestionsQuery
  }

  const createQuestionQuery = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        }
      )

      return response.json() as Promise<CreateQuestionApiResponse>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
    },
  })

  const createQuestion = (data: CreateQuestionApiRequest) => {
    setRoomId(data.roomId)
    setQuestion(data.question)
    return createQuestionQuery
  }

  return { getQuestions, createQuestion }
}
