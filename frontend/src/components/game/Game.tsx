import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { socket, SocketEvents } from '../../api/socket';
import { RummyGame } from '../../Type';
import Container from '../ui/Container'
import Lobby from './Lobby';
import Table from './Table';

const Game = () => {
    const navigate = useNavigate()
    const [game, setGame] = useState<RummyGame>()

    useEffect(() => {
        const data = JSON.stringify({
            action: 'join',
        })
        axiosInstance
            .post<any>('/games/1/', data)

            .catch((error: AxiosError) => {
                console.log(error)
                navigate('/')
            })
            .then((res: any) => {
                const { data } = res
                setGame({
                    gameId: data.game.gameId,
                    players: data.game.players,
                    gameState: data.game.gameState,
                })
                socket.on('player-join', (data: any) => {
                    console.log(data)
                })
                socket.emit('player-joined', { 'displayName': 'test' })

                socket.on(SocketEvents.JOIN_GAME, () => {

                })
            })
    }, [navigate])

    if (game?.gameState === "lobby") {
        return <Lobby />
    }

    return (
        <Table />

    )
}

export default Game;
