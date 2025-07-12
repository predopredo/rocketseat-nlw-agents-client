import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'

export const useRooms = () =>
  useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const res = await api.rooms.get()
      return await (res.json() as Promise<GetRoomsApiResponse>)
    },
  })

export const useCreateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomApiRequest) => {
      const response = await api.rooms.create(data)

      return response.json() as Promise<CreateRoomApiResponse>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    },
  }).mutateAsync
}
