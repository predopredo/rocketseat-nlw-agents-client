interface Question {
  id: string
  question: string
  answer: string | null
  createdAt: string
}

type GetQuestionsApiResponse = Question[]

type CreateQuestionApiRequest = {
  question: string
}

interface CreateQuestionApiResponse {
  id: string
}
