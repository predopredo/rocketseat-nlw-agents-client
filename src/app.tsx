import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateRoom } from './pages/createRoom'
import { Room } from './pages/room'

const queryClient = new QueryClient()

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<CreateRoom />} index />
        <Route element={<Room />} path="/room/:id" />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)
