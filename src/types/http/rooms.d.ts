type GetRoomsApiResponse = Array<{
  id: string
  name: string
  questionsCount: number
  createdAt: string
}>

interface CreateRoomRequest {
  name: string
  description: string
}

interface CreateRoomResponse {
  id: string
}
