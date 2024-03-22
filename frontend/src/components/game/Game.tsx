import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { socket, SocketEvents } from '../../api/socket';
import { RummyGame } from '../../Type';
import Container from '../ui/Container'
import Lobby from './Lobby';
import Table from './Table';

const Game = () => {
    const navigate = useNavigate()
    const { gameId } = useParams();
    const [game, setGame] = useState<RummyGame>()

    useEffect(() => {
        const data = JSON.stringify({
            action: 'join',
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)

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
                    playerCards: []
                })
                socket.on('player-join', (data: any) => {
                    console.log(data)
                })
                socket.emit('player-joined', { 'displayName': 'test' })

                socket.on(SocketEvents.JOIN_GAME, () => {

                })

                socket.on(SocketEvents.GAME_START, (data: any) => {
                    console.log(data);
                })
            })
    }, [navigate])

    if (game?.gameState === "lobby") {
        return <Lobby game={game} />
    }
    if (game?.gameState === "in-game") {
        <Table game={game} />
    }
    return (
        <Container>
            <h1>Loading...</h1>
        </Container>
    )


}

export default Game;
