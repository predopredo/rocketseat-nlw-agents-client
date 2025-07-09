import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const Room = () => {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['get-room', id],
    queryFn: () =>
      fetch(`http://localhost:3333/rooms/${id}`).then((res) => res.json()),
  })

  return <div>Room name: {data?.name}</div>
}
