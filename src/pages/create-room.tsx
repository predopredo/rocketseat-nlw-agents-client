import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsApiResponse = Array<{
  id: string
  name: string
}>

export const CreateRoom = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: () => {
      return fetch('http://localhost:3333/rooms').then(
        (res) => res.json() as Promise<GetRoomsApiResponse>
      )
    },
  })

  return (
    <div>
      {isLoading && <div>Carregando ...</div>}
      <div className="flex flex-col gap-1">
        {data?.map((room) => (
          <Link className="underline" key={room.id} to={`/room/${room.id}`}>
            {room.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
