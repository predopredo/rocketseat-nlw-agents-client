import { CreateRoomForm } from './components/CreateroomForm'
import { RoomList } from './components/Roomlist'

export const Home = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  )
}
