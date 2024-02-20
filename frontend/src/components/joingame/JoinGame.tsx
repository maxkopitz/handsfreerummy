import { useEffect } from 'react'
import { socket, SocketEvents } from '../../api/socket';
import { useGame } from '../../hooks/Game'
import Game from './Game'

const tableHeaders = ["Players", ""];
const JoinGame = () => {
    const { game, dispatch } = useGame()

    useEffect(() => {
        const onNewGame = (data: any) => {
            console.log('new game', data)
            dispatch({ type: 'add-lobby-game', game: data })
        }
        //socket.on(SocketEvents.NEW_GAMES, onNewGame)
    }, [dispatch])
    return (
        <div className="flex flex-col w-1/2 justify-center items-center">
            <h2>Join Game</h2>
            <table className="table-auto w-full w-min-max text-left border-4 rounded-sm">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {game.lobbyGames.length === 0 && (
                        <tr>
                            <td className="p-4">No games available</td>
                        </tr>
                    )}
                    {game.lobbyGames.map((item, index) => {
                        const isLast = index === game.lobbyGames.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return (
                            <Game key={item.id} game={item} className={classes} />)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default JoinGame
