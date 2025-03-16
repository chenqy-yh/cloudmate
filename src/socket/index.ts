import { base_ip, port } from '@/constants/http';
import IO, { Socket } from 'socket.io-client';


export class Client {

  private socket: Socket;

  constructor(authorization: string) {
    this.socket = IO(`ws://localhost:3000`, {
      query: {
        Authorization: authorization
      }
    })

    this.socket.on('connect', () => {
      console.log('socket connected')
    })

    this.socket.on('message', () => {
      console.log('message')
    })

    this.socket.on('disconnect', () => {
      console.log('socket disconnected')
    })
  }

  connect() {
    console.log('connecting')
    this.socket.connect()
  }

  disconnect() {
    this.socket.disconnect()
  }
}

let client: Client | undefined;

export const createClient = (authorization: string) => {
  client = new Client(authorization)
  return client;
}

export const getClient = () => {
  if (client) return client;
  throw new Error('Client not initialized')
}

export const closeClient = () => {
  if (client) {
    client.disconnect()
    client = undefined;
  }
}
