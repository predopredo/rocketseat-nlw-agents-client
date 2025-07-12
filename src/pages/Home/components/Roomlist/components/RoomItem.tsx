import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { dayjs } from '@/lib/dayjs'

interface RoomItemProps {
  room: Room
}

export const RoomItem = ({ room }: RoomItemProps) => {
  return (
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
  )
}
