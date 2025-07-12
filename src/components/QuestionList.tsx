import { useQuestions } from '@/services/questions'
import { QuestionItem } from './QuestionItem'

interface QuestionListProps {
  roomId: string
}

export const QuestionList = ({ roomId }: QuestionListProps) => {
  const { data: questions, isLoading } = useQuestions(roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
        {isLoading && (
          <p className="text-muted-foreground text-sm">
            Carregando Perguntas...
          </p>
        )}
      </div>

      {questions?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  )
}
