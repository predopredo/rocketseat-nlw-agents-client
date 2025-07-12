import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { RecordRoomAudio } from './pages/RecordRoomAudio'
import { RoomQuestions } from './pages/RoomQuestions'

const queryClient = new QueryClient()

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<RoomQuestions />} path="/room/:id" />
        <Route element={<RecordRoomAudio />} path="/room/:id/audio" />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)
