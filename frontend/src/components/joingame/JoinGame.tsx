import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { LobbyGame } from '../../Type'
import Game from './Game'

const tableHeaders = ['ID', 'Players', 'Click Button to Join']

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
