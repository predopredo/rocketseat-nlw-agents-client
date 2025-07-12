interface Room {
  id: string
  name: string
  questionsCount: number
  createdAt: string
}

type GetRoomsApiResponse = Room[]

interface CreateRoomApiRequest {
  name: string
  description: string
}

interface CreateRoomApiResponse {
  id: string
}

interface UploadRoomAudioApiRequest {
  roomId: string
  audioBlob: Blob
}
