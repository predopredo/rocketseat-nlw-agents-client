const baseUrl = 'http://localhost:3333'

export const api = {
  rooms: {
    get: () => fetch(`${baseUrl}/rooms`),
    create: (data: CreateRoomApiRequest) =>
      fetch(`${baseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    uploadAudio: (roomId: string, data: FormData) =>
      fetch(`${baseUrl}/rooms/${roomId}/audio`, {
        method: 'POST',
        body: data,
      }),
  },
  questions: {
    get: (roomId: string) => fetch(`${baseUrl}/rooms/${roomId}/questions`),
    create: (roomId: string, question: string) =>
      fetch(`${baseUrl}/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      }),
  },
}
