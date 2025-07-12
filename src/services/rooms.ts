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

export const useUploadRoomAudio = () => {
  return useMutation({
    mutationFn: async ({ roomId, audioBlob }: UploadRoomAudioApiRequest) => {
      const formData = new FormData()
      formData.append('audio.webm', audioBlob)
      const response = await api.rooms.uploadAudio(roomId, formData)
      return response.json()
    },
  }).mutateAsync
}
