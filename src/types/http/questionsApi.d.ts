interface Question {
  id: string
  question: string
  answer: string | null
  createdAt: string
  isAnswered?: boolean
}

type GetQuestionsApiResponse = Question[]

type CreateQuestionApiRequest = {
  roomId: string
  question: string
}

interface CreateQuestionApiResponse {
  id: string
  answer: string | null
}
