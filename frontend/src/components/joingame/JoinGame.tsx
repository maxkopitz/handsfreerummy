import { useEffect } from 'react'
import { LobbyGame } from '../../Type'
import { useGame } from '../../hooks/Game'
import { SocketEvents, socket } from '../../api/socket'
import Game from './Game'

const JoinGame = () => {
    const { game, dispatch } = useGame()

    useEffect(() => {
        /*const onNewGame = (data: any) => {
            console.log('new game', data)
            dispatch({ type: 'add-lobby-game', game: data })
        }
        socket.on(SocketEvents.NEW_GAMES, onNewGame)*/
    }, [dispatch])
    return (
        <div className="flex flex-col justify-center items-center">
            <h2>Join Game</h2>
            <table className="table-auto w-full min-h-48 min-w-96 border-4 rounded-sm border-green-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Players</th>
                        <th className="border border-slate-600"></th>
                    </tr>
                </thead>
                <tbody>
                    {game.lobbyGames.map((game) => (
                        <Game key={game.id} game={game} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JoinGame
