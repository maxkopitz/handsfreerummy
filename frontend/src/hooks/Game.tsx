import React, { createContext, useReducer, useContext } from 'react'
import { LobbyGame } from '../Type'

interface Game {
    lobbyGames: LobbyGame[]
    isTurn: boolean
}

const initialState: Game = {
    isTurn: false,
    lobbyGames: [

    ],
}

const GameContext = createContext<{
    game: Game
    dispatch: React.Dispatch<Action>
}>({ game: initialState, dispatch: () => null })

export const GameProvider = ({ children }: any) => {
    const [game, dispatch] = useReducer(gameReducer, initialState)
    return (
        <GameContext.Provider value={{ game, dispatch }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => {
    return useContext(GameContext)
}
type Action =
    | { type: 'setTurn' }
    | { type: 'add-lobby-game'; game: LobbyGame }
    | { type: 'remove-lobby-game'; id: string }

export const GAMEACTION = {
    START_GAME: 'start-game',
    ADD_LOBBY_GAME: 'add-lobby-game',
    REMOVE_LOBBY_GAME: 'remove-lobby-game',
}

const gameReducer = (state: Game, action: Action) => {
    switch (action.type) {
        case 'setTurn':
            return { ...state, isTurn: !state.isTurn }
        case 'add-lobby-game':
            return { ...state, lobbyGames: [...state.lobbyGames, action.game] }
        case 'remove-lobby-game':
            return {
                ...state,
                lobbyGames: state.lobbyGames.filter(
                    (game) => game.id !== action.id
                ),
            }
        default:
            return state
    }
}
