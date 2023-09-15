import {useState, useEffect} from 'react'
import io, {Socket} from 'socket.io-client'

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const serverUrl = process.env.REACT_APP_SOCKET_URL ?? '-'
  if (serverUrl === '-') {
    throw new Error('Please Setup Socket URL First!')
  }
  useEffect(() => {
    const socketIo: Socket = io(serverUrl)

    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [serverUrl])

  return socket
}

export default useSocket
