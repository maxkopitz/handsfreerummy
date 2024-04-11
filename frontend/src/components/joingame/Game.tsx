import { useNavigate } from 'react-router-dom'
import { LobbyGame } from '../../Type'
import Button from '../ui/Button'

function findFirstNumber(str: string) {
    const regex = /\d+/; // Regular expression to match one or more digits
    const match = str.match(regex); // Use match() to find the first match of the regex in the string
    
    // If no number found, return null
    if (!match) {
      return null;
    }
  
    // Convert the matched string to a number and return it
    return Number(match[0]);
}


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
        <tr className= "border-b border-30 border-black items-center justify-center">
            <td className={className}>{game.id}</td>
            <td className={className}>{game.players}</td> 
             {/* findFirstNumber(game.players.toString()) */}
            <td className={className}>
                <Button text={'Join Game'} onClick={handleJoinGame} />
            </td>
        </tr>
    )
}
export default Game
