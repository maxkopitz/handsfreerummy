import { io } from 'socket.io-client'
import { API_URL } from '../config'

export const socket = io(API_URL,
    {
        withCredentials: true,
    })

export const SocketEvents = {
    GAME_CREATED: 'game-created', // recieved
    CREATE_GAME: 'create-game', // sent
    NEW_GAMES: 'new-games', // recieved
    JOIN_GAME: 'join-game', // sent
    PLAYER_JOINED: 'player-joined', // recieved
    GAME_JOINED: 'game-joined', // recieved
    GAME_START: 'game-start', // sent
    GAME_STARTED: 'game-started', // recieved
    PLAY_MOVE: 'play-move', // sent
    PLAYED_MOVE: 'played-move', // recieved
}
