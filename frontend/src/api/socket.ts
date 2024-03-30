import { io } from 'socket.io-client'
import { SOCKET_URL } from '../config'

export const socket = io(SOCKET_URL,
    {
        withCredentials: true,
        autoConnect: false
    })

export const SocketEvents = {
    GAME_CREATED: 'game-created', // recieved
    NEW_GAMES: 'new-games', // recieved
    PLAYER_JOINED: 'player-joined', // recieved
    PLAYER_LEFT: 'player-left', // recieved
    GAME_JOINED: 'game-joined', // recieved
    GAME_STARTED: 'game-started', // recieved
    PLAYED_MOVE: 'played-move', // recieved
}
