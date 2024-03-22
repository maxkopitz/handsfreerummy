import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { RummyGame } from '../../Type'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { SocketEvents, socket } from '../../api/socket'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'

interface LobbyProps {
    game: RummyGame
}
const Lobby = ({ game }: LobbyProps) => {
    const navigate = useNavigate()
    const { dispatch } = useModal()
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
                <Button
                    text={'Settings'}
                    onClick={() =>
                        dispatch({
                            type: 'showModal',
                            modal: {
                                title: 'Settings',
                                component: <Settings />,
                            },
                        })
                    }
                />

            </div>
        </Container>
    )
}

export default Lobby
