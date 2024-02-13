import { redirect } from 'react-router-dom'
import { LobbyGame } from '../../Type'
import { socket } from '../../socket'
import Button from '../ui/Button'

interface GameProps {
    game: LobbyGame
}

const Game = ({ game }: GameProps) => {
    const handleJoinGame = () => {
        console.log('join game')
        redirect('/game')
        socket.emit('join-game', game.id, (data: any) => {})
    }
    return (
        <tr>
            <td className="border boarder-slate-700">0/4</td>
            <td className="border boarder-slate-700">
                <Button text={'join'} onClick={handleJoinGame} />
            </td>
        </tr>
    )
}
export default Game
