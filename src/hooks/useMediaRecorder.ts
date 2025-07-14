/** biome-ignore-all lint/suspicious/noConsole: Debug */
import { useRef, useState } from 'react'

const isRecordingSupported =
  'mediaDevices' in navigator &&
  'getUserMedia' in navigator.mediaDevices &&
  'MediaRecorder' in window

export const useMediaRecorder = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const onRecordEnd = useRef<((audioBlob: Blob) => void) | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const createMediaRecorder = (stream: MediaStream) => {
    mediaRecorder.current = new MediaRecorder(stream, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    mediaRecorder.current.ondataavailable = (event) => {
      if (!onRecordEnd.current) {
        throw new Error('onRecordEnd.current is not set')
      }
      if (event.data.size > 0) {
        onRecordEnd.current?.(event.data)
      }
    }

    mediaRecorder.current.onstart = () => {
      console.log('Iniciando gravação')
    }

    mediaRecorder.current.onstop = () => {
      console.log('Gravação encerrada')
    }

    mediaRecorder.current.start()
  }

  const startRecording = async () => {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação de áudio')
      return
    }

    setIsRecording(true)

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createMediaRecorder(stream)

    intervalRef.current = setInterval(() => {
      mediaRecorder.current?.stop()

      createMediaRecorder(stream)
    }, 5000)
  }

  const stopRecording = () => {
    setIsRecording(false)

    if (mediaRecorder.current?.state !== 'inactive') {
      mediaRecorder.current?.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  return {
    startRecording,
    stopRecording,
    isRecording,
    onRecordEnd,
  }
}
