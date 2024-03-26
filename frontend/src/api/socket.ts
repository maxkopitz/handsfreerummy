import { io } from 'socket.io-client'
import { API_URL } from '../config'

export const socket = io(API_URL,
    {
        withCredentials: true,
    })

export const SocketEvents = {
    GAME_CREATED: 'game-created', // recieved
    NEW_GAMES: 'new-games', // recieved
    PLAYER_JOINED: 'player-joined', // recieved
    GAME_JOINED: 'game-joined', // recieved
    GAME_STARTED: 'game-started', // recieved
    PLAYED_MOVE: 'played-move', // recieved
}
