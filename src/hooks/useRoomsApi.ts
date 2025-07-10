import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useRoomsApi = () => {
  const queryClient = useQueryClient()

  const getRooms = useQuery({
    queryKey: ['get-rooms'],
    queryFn: () => {
      return fetch('http://localhost:3333/rooms').then(
        (res) => res.json() as Promise<GetRoomsApiResponse>
      )
    },
  })

  const createRoom = useMutation({
    mutationFn: async (data: CreateRoomApiRequest) => {
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return response.json() as Promise<CreateRoomApiResponse>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    },
  })

  return { getRooms, createRoom }
}
