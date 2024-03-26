import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { socket, SocketEvents } from '../../api/socket'
import { RummyGame, Value, Suit, GameTurn } from '../../Type'
import Container from '../ui/Container'
import Lobby from './Lobby'
import Table from './Table'
import { useProfile } from '../../hooks/Profile'

const Game = () => {
    const navigate = useNavigate()
    const { profile } = useProfile()
    const { gameId } = useParams()

    const [game, setGame] = useState<RummyGame>({
        gameId: '0',
        gameState: '',
        players: [],
        hand: [],
        discard: { value: Value.J, suit: Suit.C },
        melds: [],
        turnCounter: 0,
        playerOrder: 0,
        isOwner: false,
        turnState: GameTurn.PICKUP
    })

    const joinGame = async () => {
        const data = JSON.stringify({
            action: 'join',
            displayName: profile.displayName,
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                const { data } = res
                console.log(data)
                setGame({
                    gameId: data.game.gameId,
                    players: data.game.players,
                    gameState: data.game.gameState,
                    hand: data.game.hand,
                    melds: data.game?.melds,
                    discard: data.game?.discard,
                    turnCounter: data.game?.turnCounter,
                    playerOrder: data.game?.playerOrder,
                    isOwner: data.game?.isOwner,
                    turnState: data.game?.turnState
                })
            })
            .catch((error: any) => {
                navigate('/')
            })
    }

    useEffect(() => {
        joinGame()

        socket.on(SocketEvents.PLAYER_JOINED, (data: any) => {
            console.log(data.data.displayName, 'has joined')
        })

        socket.on(SocketEvents.GAME_STARTED, (data: any) => {
            console.log('STARTED:', data)
            setGame({
                ...game,
                hand: data.game.hand,
                discard: data.game.discard,
                gameState: 'in-game',
                players: data.game.players,
                playerOrder: data.game.playerOrder,
                turnCounter: data.game.turnCounter,
                turnState: data.game.turnState
            })
        })

        socket.on(SocketEvents.PLAYED_MOVE, (data: any) => {
            console.log(data)
            if (data?.move.type === 'pickup') {
                setGame({
                    ...game,
                    turnState: data.nextMove,
                    discard: data.move.data.discard,
                    players: data.move.data.players
                })
            }
            else if (data?.move.type === 'meld') {
                setGame({
                    ...game,
                    turnState: data.nextMove,
                    players: data.move.data.players
                })
            }
            else if (data?.move.type === 'discard') {
                setGame({
                    ...game,
                    discard: data.game.discard,
                    players: data.game.players,
                    turnCounter: data.game.turnCounter,
                    turnState: data.game.turnState
                })
            }
        });

        return () => {
            socket.off(SocketEvents.PLAYER_JOINED)
            socket.off(SocketEvents.GAME_STARTED)
            socket.off(SocketEvents.PLAYED_MOVE)
        }
    }, [])

    const handleClickPickup = () => {
        const data = JSON.stringify({
            action: 'move',
            move: {
                type: 'drawPickup'
            },
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                setGame((prevState) => ({
                    ...prevState,
                    hand: [...prevState.hand, res.data.game.card],
                    turnState: res.data.game.turnState
                }))
            })
            .catch(() => {
                console.log('An error occured')
            })
    }

    const handleClickPickupDiscard = () => {
        const data = JSON.stringify({
            action: 'move',
            move: {
                type: 'drawDiscard',
                data: {
                    card: 'card'
                }
            },
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                setGame((prevState) => ({
                    ...prevState,
                    hand: [...prevState.hand, res.data.move.data.card],
                    discard: res.data.move?.data.discard,
                    turnState: res.data.nextTurnState
                }))
            })
            .catch(() => {
                console.log('An error occured')

            })
    }

    const handleDiscard = ({ card }: any) => {
        const data = JSON.stringify({
            action: 'move',
            move: {
                type: 'discard',
                data: {
                    card: card
                }
            },
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                setGame((prevState) => {
                    return {
                        ...prevState,
                        hand: prevState.hand.filter((c) => (c.suit !== card.suit && c.value !== card.value)),
                        discard: res.data.move?.data.discard,
                        turnState: res.data.nextTurnState
                    }
                })
            })
            .catch(() => {
                console.log('An error occured')
            })
        console.log('discard pile')
    }

    if (game?.gameState === 'lobby') {
        return <Lobby game={game} />
    }
    if (game?.gameState === 'in-game') {
        return (
            <Table
                game={game}
                handleClickPickup={handleClickPickup}
                handleClickDiscard={handleClickPickupDiscard}
                handleDiscard={handleDiscard}
            />
        )
    }
    return (
        <Container>
            <h1>Loading...</h1>
        </Container>
    )
}

export default Game
