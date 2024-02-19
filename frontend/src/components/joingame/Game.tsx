import { useNavigate } from 'react-router-dom'
import { LobbyGame } from '../../Type'
import Button from '../ui/Button'

interface GameProps {
    game: LobbyGame
}

const Game = ({ game }: GameProps) => {
    const navigate = useNavigate()
    const handleJoinGame = () => {
        navigate('/game')
        console.log('join game')
        //socket.emit('join-game', game.id, (data: any) => {})
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
