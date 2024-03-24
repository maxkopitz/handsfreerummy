import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { socket, SocketEvents } from '../../api/socket'
import { CardType, RummyGame, Suit, Value } from '../../Type'
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
                    playerCards: [],
                })
                socket.on('player-join', (data: any) => {
                    console.log(data.data.displayName, 'has joined')
                })
                socket.emit('player-joined', {
                    displayName: profile.displayName,
                })

                socket.on(SocketEvents.GAME_START, (data: any) => {
                    console.log(data)

                    const cards: CardType[] = []
                    data.data.hand.forEach((tmp: any) => {
                        console.log(tmp)
                        cards.push({
                            suit: tmp.suit,
                            value: tmp.value,
                        })
                    })
                    setGame({
                        ...game,
                        playerCards: cards,
                        gameState: 'in-game',
                    })
                })
            })

        return () => {
            socket.off('player-join')
            socket.off(SocketEvents.GAME_START)
        }
    }, [navigate])

    useEffect(() => {
        console.log(game)
    }, [game])

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
