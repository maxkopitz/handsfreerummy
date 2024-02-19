import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
    process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000'

export const socket = io(URL,
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
