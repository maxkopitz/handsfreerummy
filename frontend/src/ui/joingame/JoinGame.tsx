import { LobbyGame } from '../../Type'
import Game from './Game'

interface JoinGameProps {
    games: LobbyGame[]
}
const JoinGame = ({ games }: JoinGameProps) => {
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
                    {games.map((game) => (
                        <Game key={game.id} game={game} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JoinGame
