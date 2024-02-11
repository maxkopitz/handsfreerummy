import React, { createContext, useReducer, useContext } from 'react'

interface Game {
    isTurn: boolean
}

const initialState: Game = {
    isTurn: false,
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
type Action = { type: 'setTurn' }

export const GAMEACTION = {
    START_GAME: 'start-game',
}

const gameReducer = (state: Game, action: Action) => {
    switch (action.type) {
        case 'setTurn':
            return { ...state, isTurn: !state.isTurn }
        default:
            return state
    }
}
