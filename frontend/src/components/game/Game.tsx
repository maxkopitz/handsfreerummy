import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { socket, SocketEvents } from '../../api/socket'
import { CardType, RummyGame } from '../../Type'
import Container from '../ui/Container'
import Lobby from './Lobby'
import Table from './Table'
import { useProfile } from '../../hooks/Profile'

const Game = () => {
    const navigate = useNavigate()
    const { profile } = useProfile()
    const { gameId } = useParams()
    const [game, setGame] = useState<RummyGame>({
        gameId: '1',
        gameState: '',
        players: [],
        playerCards: [],
    })


    const joinGame = async () => {
        const data = JSON.stringify({
            action: 'join',
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                const { data } = res
                setGame({
                    gameId: data.game.gameId,
                    players: data.game.players,
                    gameState: data.game.gameState,
                    playerCards: data.game.playerHand,
                })

                socket.emit('player-joined', {
                    displayName: profile.displayName,
                })

            })
            .catch(() => {
                console.log('This is an error')
                navigate('/')
            })
    }

    useEffect(() => {
        joinGame();

        socket.on('player-join', (data: any) => {
            console.log(data.data.displayName, 'has joined')
        })

        socket.on(SocketEvents.GAME_START, (data: any) => {
            setGame({
                ...game,
                playerCards: data.data.hand,
                gameState: 'in-game',
            })
        })


        return () => {
            socket.off('player-join')
            socket.off(SocketEvents.GAME_START)
        }
    }, [navigate])

    if (game?.gameState === 'lobby') {
        return <Lobby game={game} />
    }
    if (game?.gameState === 'in-game') {
        return <Table game={game} />
    }
    return (
        <Container>
            <h1>Loading...</h1>
        </Container>
    )
}

export default Game
