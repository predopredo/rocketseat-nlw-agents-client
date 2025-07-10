type GetRoomsApiResponse = Array<{
  id: string
  name: string
  questionsCount: number
  createdAt: string
}>

interface CreateRoomApiRequest {
  name: string
  description: string
}

interface CreateRoomApiResponse {
  id: string
}
