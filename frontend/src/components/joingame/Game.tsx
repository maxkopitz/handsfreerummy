import { useNavigate } from 'react-router-dom'
import { LobbyGame } from '../../Type'
import Button from '../ui/Button'

interface GameProps {
    game: LobbyGame
    className: string
}

    const Game = ({ game, className }: GameProps) => {
    const navigate = useNavigate()
    const handleJoinGame = () => {
        navigate('/game')
        console.log('join game')
        //socket.emit('join-game', game.id, (data: any) => {})
    }
    return (
        <tr>
            <td className={className}>{game.players}</td>
            <td className={className}>
                <Button text={'join'} onClick={handleJoinGame} />
            </td>
        </tr>
    )
}
export default Game
