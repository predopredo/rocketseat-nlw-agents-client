import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dayjs } from '@/lib/dayjs'
import { useRooms } from '@/services/rooms'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export const RoomList = () => {
  const { data: rooms, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido às salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando Salas...</p>
        )}

        {rooms?.map((room) => (
          <Link
            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/35"
            key={room.id}
            to={`/room/${room.id}`}
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>
              <div className="flex items-center gap-2">
                <Badge className="text-xs" variant="secondary">
                  {dayjs(room.createdAt).fromNow()}
                </Badge>
                <Badge className="text-xs" variant="secondary">
                  {room.questionsCount} pergunta(s)
                </Badge>
              </div>
            </div>

            <span className="flex items-center gap-1">
              Entrar
              <ArrowRightIcon className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
