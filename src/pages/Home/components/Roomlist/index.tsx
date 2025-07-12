import { useRooms } from '@/services/rooms'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card'
import { RoomItem } from './components/RoomItem'

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
          <RoomItem key={room.id} room={room} />
        ))}
      </CardContent>
    </Card>
  )
}
