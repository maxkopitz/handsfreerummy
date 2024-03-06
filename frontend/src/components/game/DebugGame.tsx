import { RummyGame } from '../../Type'
import Container from '../ui/Container'
interface DebugGameProps {
    game: RummyGame
    isConnected: boolean
}
const DebugGame = ({ game, isConnected }: DebugGameProps) => {
    return (
        <Container>
            <h1>Socket Connected: {isConnected ? 'true' : 'false'}</h1>
            <h1>GameId: {game.gameId}</h1>
            <h1>Players</h1>
            <ul>
                {game.players.map((item, key) => (
                    <li key={key}>{item}</li>
                ))}
            </ul>
        </Container>
    )
}
export default DebugGame
