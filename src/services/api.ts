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
  },
  questions: {
    get: (roomId: string) => fetch(`${baseUrl}/rooms/${roomId}/questions`),
    create: (roomId: string, data: CreateQuestionApiRequest) =>
      fetch(`${baseUrl}/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
  },
}
