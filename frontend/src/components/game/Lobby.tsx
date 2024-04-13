import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { RummyPlayer, RummyGame } from '../../Type'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'
import Tutorial from '../tutorial/Tutorial'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

interface LobbyProps {
    game: RummyGame
}

const Lobby = ({ game }: LobbyProps) => {
    const navigate = useNavigate()
    const { dispatch } = useModal()
    

    const NamesList = () => {

        const [names, setNames] = useState<string[]>([])

        useEffect(() => {

            axiosInstance
                .get<any>('/games/' + game.gameId)
                .then((res: any) => {
                    const { data } = res
                    const parsedNames: any[] = []
                    data.game.players.forEach((player: any) => {
                        parsedNames.push(
                            player.name
                        )
                    })
                    setNames(parsedNames)
                })
                .catch((error: AxiosError) => {
                    console.log(error)
                })
        }, [])

        return (
          <div>
            <ul>
              {names.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        );
    }

    const handleLeaveGame = () => {
        const data = JSON.stringify({
            action: 'leave',
        })
        const leaveGame = async () => {
            await axiosInstance
                .post<any>('/games/' + game.gameId + '/', data)
                .then((res: any) => {
                    toast.success("Left Game!")
                    navigate('/')
                })
                .catch((error: AxiosError) => {
                    console.log(error)
                })
        }
        leaveGame();
    }

    const handleStartGame = () => {
        const data = JSON.stringify({
            action: 'start',
        })
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', data)
            .then((res: any) => {
                if (res?.data?.status === 'error') {
                    toast.error(res.data.error.message)
                }
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }
    const handleCloseGame = () => {
        const data = JSON.stringify({
            action: 'end-game',
        })
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', data)
            .then((res: any) => {

                toast.success("Closed Game!")
                navigate('/')
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    return (
        <Container>
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-xl font-bold">Lobby #{game.gameId} </h1>
                <h1>Players: {game.players.length} </h1>


                <ul>
                {game.players.map((item, key) => (
                    <li key={key}>{JSON.stringify(item.displayName)}</li>
                    ))}
                </ul>

                
                <NamesList />

                {!game.isOwner && (
                    <Button
                        text={'Leave Game'}
                        onClick={handleLeaveGame} />
                )}
                {game.isOwner && (
                    <Button
                        text={'Close Game'}
                        onClick={handleCloseGame} />
                )}
                {game.isOwner && (
                    <Button
                        text={'Start Game'}
                        onClick={handleStartGame}
                        disabled={game.players.length === 1}
                        isActive={game.players.length === 1} />
                )}

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
