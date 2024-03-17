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
        navigate('/games/' + game.id)
    }
    return (
        <tr>
            <td className={className}>{game.id}</td>
            <td className={className}>{game.players}</td>
            <td className={className}>
                <Button text={'Join Game'} onClick={handleJoinGame} />
            </td>
        </tr>
    )
}
export default Game
