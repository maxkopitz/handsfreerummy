import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { RummyGame } from '../../Type'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { SocketEvents, socket } from '../../api/socket'

interface LobbyProps {
    game: RummyGame
}
const Lobby = ({ game }: LobbyProps) => {
    const navigate = useNavigate()
    const handleLeaveGame = () => {
        const data = JSON.stringify({
            action: 'leave',
        })
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', data)
            .catch((error: AxiosError) => {
                console.log(error)
            })
            .then((res: any) => {
                console.log(res)
                navigate('/')
            })
    }

    const handleStartGame = () => {
        const data = JSON.stringify({
            action: 'start',
        })
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', data)
            .catch((error: AxiosError) => {
                console.log(error)
            })
            .then((res: any) => {
                console.log(res)
            })
    }

    return (
        <Container>
            <div>
                <h1>I am a lobby {game.gameId} </h1>

                <Button text={'Leave Game'} onClick={handleLeaveGame} />
                <Button text={'Start Game'} onClick={handleStartGame} />
            </div>
        </Container>
    )
}

export default Lobby
