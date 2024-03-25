import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { LobbyGame } from '../../Type'
import Game from './Game'

const tableHeaders = ['ID', 'Players', 'Click to Join']

const JoinGame = () => {
    const [games, setGames] = useState<LobbyGame[]>([])

    useEffect(() => {
        axiosInstance
            .get<any>('/games/')
            .then((res: any) => {
                const { data } = res
                const parsedGames: any[] = []
                data.games.forEach((game: any) => {
                    if (game.gameState === 'lobby') {

                        parsedGames.push({
                            id: game.gameId,
                            players: 0,
                            state: game.gameState,
                        })

                    }
                })
                setGames(parsedGames)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="flex flex-col w-1/2 justify-center items-center">
            <h1 className="font-bold text-2xl">Join Game</h1>
            <table className="table-auto w-full w-min-max text-left border-4 rounded-sm">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                key={index}
                            >
                                {header}
                            </th>
                        ))}
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
                            : 'p-4 border-b border-blue-gray-50'
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
