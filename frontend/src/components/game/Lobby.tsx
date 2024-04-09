import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { RummyGame } from '../../Type'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'
import Tutorial from '../tutorial/Tutorial'

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
            .then((res: any) => {
                console.log(res)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }
    const handleCloseGame = () => {
        const data = JSON.stringify({
            action: 'close',
        })
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', data)
            .then((res: any) => {
                console.log(res)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }
    return (
        <Container>
            <div className = "flex flex-col justify-center items-center h-full">
                <h1>Lobby #{game.gameId} </h1>
                <h1>Players: {game.players.length} </h1>

                {!game.isOwner && <Button text={'Leave Game'} onClick={handleLeaveGame} />}
                {game.isOwner && <Button text={'Close Game'} onClick={handleCloseGame} />}
                {game.isOwner && <Button text={'Start Game'} onClick={handleStartGame} />}
                
                <Button
                    text={'Settings'}
                    onClick={() =>
                        dispatch({
                            type: 'showModal',
                            modal: {
                                title: 'Settings',
                                component: <Settings />,
                                isSaveButton: true,
                            },
                        })
                    }
                />
                <Button
                    text={'Tutorial'}
                    onClick={() =>
                        dispatch({
                            type: 'showModal',
                            modal: {
                                title: 'Tutorial',
                                component: <Tutorial />,
                            },
                        })
                    }
                />
            </div>
        </Container>
    )
}

export default Lobby
