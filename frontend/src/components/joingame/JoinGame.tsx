import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { LobbyGame } from '../../Type'
import Game from './Game'

import { toast } from 'react-hot-toast'

const tableHeaders = ['ID', 'Players', 'Click Button to Join']

const JoinGame = () => {
    const [games, setGames] = useState<LobbyGame[]>([])

    const fetchGames = async () => {
        await axiosInstance
            .get<any>('/games/')
            .then((res: any) => {
                const { data } = res
                const parsedGames: any[] = []
                data.games.forEach((game: any) => {
                    if (game.gameState === 'lobby') {
                        parsedGames.push({
                            id: game.gameId,
                            players: Object.keys(game.players).length,
                            state: game.gameState,
                        })
                    }
                })
                setGames(parsedGames)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchGames()
    }, [])

    const handleClickRefresh = () => {
        toast.promise(fetchGames(), {
            loading: 'Loading...',
            success: 'Games refreshed!',
            error: 'Error refreshing games',
        })
    }
    return (
        <div className="flex flex-col w-1/2 justify-center items-center">
            <h1 className="font-bold text-2xl">
                Join a game below to get started!
            </h1>
            <table className="table-auto w-full w-min-max text-left border-30 rounded-sm justify-center items-center">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                                className="border-b border-black bg-blue-gray-50 p-4 justify-center items-center"
                                key={index}
                            >
                                {header}
                            </th>
                        ))}
                        <th className="border-b border-black bg-blue-gray-50 p-4 justify-center items-center">
                            <button onClick={handleClickRefresh}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {games.length === 0 && (
                        <tr>
                            <td className="p-4">No games available</td>
                        </tr>
                    )}
                    {games.map((item, index) => {
                        const isLast = index === games.length - 1
                        const classes = isLast
                            ? 'p-4'
                            : 'p-4 border-b border-30 border-black'
                        return (
                            <Game
                                key={item.id}
                                game={item}
                                className={classes}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default JoinGame
