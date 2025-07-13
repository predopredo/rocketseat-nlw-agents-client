import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useMediaRecorder } from '@/hooks/useMediaRecorder'
import { useUploadRoomAudio } from '@/services/rooms'

type AudioRoomRouteParams = {
  id: string
}

export const RecordRoomAudio = () => {
  const { id: roomId } = useParams<AudioRoomRouteParams>()
  const { isRecording, startRecording, stopRecording, onRecordEnd } =
    useMediaRecorder()
  const { mutateAsync: uploadRoomAudio } = useUploadRoomAudio()

  onRecordEnd.current = async (audioBlob) => {
    if (roomId) {
      await uploadRoomAudio({ roomId, audioBlob })
    }
  }

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Parar gravação' : 'Gravar áudio'}
      </Button>
      <p>{isRecording ? 'Gravando...' : 'Pausado'}</p>
    </div>
  )
}
