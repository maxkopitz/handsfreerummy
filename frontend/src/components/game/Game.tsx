import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { socket, SocketEvents } from '../../api/socket'
import {
    RummyGame,
    Value,
    Suit,
    GameTurn,
    CardType,
    ValueOrder,
    SuitOrder,
    Meld,
} from '../../Type'
import Container from '../ui/Container'
import Lobby from './Lobby'
import Table from './Table'
import { useProfile } from '../../hooks/Profile'
import {
    parseCard,
    parseHand,
    reduceCard,
    selectedCards,
} from '../../lib/parsers'
import { useModal } from '../../hooks/Modal'

const Game = () => {
    const navigate = useNavigate()
    const { profile } = useProfile()
    const { gameId } = useParams()
    const { dispatch: dispatchModal } = useModal()

    const [game, setGame] = useState<RummyGame>({
        gameId: '0',
        gameState: '',
        players: [],
        hand: [],
        sortState: true,
        discard: { value: Value.J, suit: Suit.C, isSelected: false },
        melds: [],
        turnCounter: 0,
        playerOrder: 0,
        isOwner: false,
        turnState: GameTurn.PICKUP,
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
                const melds = data.game.melds.map(
                    (meld: any, index: number) => {
                        return { meldId: index, cards: meld }
                    }
                )
                setGame({
                    gameId: data.game.gameId,
                    players: data.game.players,
                    gameState: data.game.gameState,
                    hand: parseHand(data.game.hand),
                    sortState: true,
                    melds: melds,
                    discard: data.game?.discard,
                    turnCounter: data.game?.turnCounter,
                    playerOrder: data.game?.playerOrder,
                    isOwner: data.game?.isOwner,
                    turnState: data.game?.turnState,
                })
            })
            .catch(() => {
                navigate('/')
            })
    }

    useEffect(() => {
        joinGame()

        socket.on(SocketEvents.PLAYER_JOINED, (data: any) => {
            console.log(data.data.displayName, 'has joined.')
        })

        socket.on(SocketEvents.PLAYER_LEFT, (data: any) => {
            console.log(data.data.displayName, 'has left.')
        })

        socket.on(SocketEvents.GAME_STARTED, (data: any) => {
            console.log('STARTED:', data)
            setGame({
                ...game,
                hand: parseHand(data.game.hand),
                discard: data.game.discard,
                gameState: 'in-game',
                players: data.game.players,
                playerOrder: data.game.playerOrder,
                turnCounter: data.game.turnCounter,
                turnState: data.game.turnState,
            })
        })

        socket.on(SocketEvents.PLAYED_MOVE, (data: any) => {
            console.log(data)
            if (data?.move.type === 'pickup') {
                setGame((prevState) => ({
                    ...prevState,
                    turnState: data.nextMove,
                    discard: parseCard(data.move.data.discard),
                    players: data.move.data.players,
                }))
            } else if (data?.move.type === 'meld') {
                const melds = data.move.data.melds.map(
                    (meld: any, index: number) => {
                        return { meldId: index, cards: meld }
                    }
                )
                setGame((prevState) => ({
                    ...prevState,
                    turnState: data.nextMove,
                    melds: melds,
                    players: data.move.data.players,
                }))
            } else if (data?.move.type === 'discard') {
                setGame((prevState) => ({
                    ...prevState,
                    discard: parseCard(data.move.data.discard),
                    players: data.move.data.players,
                    turnCounter: data.nextTurnCounter,
                    turnState: data.nextTurnState,
                }))
            } else if (data?.move.type === 'roundEnd') {
                navigate('/')
            }
        })

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
                type: 'drawPickup',
            },
        })

        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                console.log(res)
                setGame((prevState) => ({
                    ...prevState,
                    hand: [
                        ...prevState.hand,
                        { ...res.data.move.data.card, isSelected: false },
                    ],
                    turnState: res.data.nextTurnState,
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
                    card: 'card',
                },
            },
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                setGame((prevState) => ({
                    ...prevState,
                    hand: [...prevState.hand, res.data.move.data.card],
                    discard: res.data.move?.data.discard,
                    turnState: res.data.nextTurnState,
                }))
            })
            .catch(() => {
                console.log('An error occured')
            })
    }

    const handleMeld = () => {
        if (selectedCards(game.hand).length < 3) {
            return
        }

        const cards: any = selectedCards(game.hand).map((card) => {
            return reduceCard(card)
        })

        const data = JSON.stringify({
            action: 'move',
            move: {
                type: 'meld',
                data: {
                    cards: cards
                },
            },
        })

        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
            console.log(res)
                const melds = res.data.move.data.melds.map(
                    (meld: any, index: number) => {
                        return { meldId: index, cards: meld }
                    }
                )
                setGame((prevState) => ({
                    ...prevState,
                    hand: parseHand(res.data.move.data.hand),
                    turnState: res.data.nextTurnState,
                    melds: melds,
                }))
            })
            .catch((error: any) => {
                console.log('An error occured')
            })
    }

    const handleLayoff = (meld: Meld) => {
        if (selectedCards(game.hand).length !== 1) {
            console.log('no card')
            return
        }

        const card: any = reduceCard(selectedCards(game.hand).at(0))

        const data = JSON.stringify({
            action: 'move',
            move: {
                type: 'layoff',
                data: {
                    meldId: meld.meldId,
                    card: card,
                },
            },
        })

        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then(({ data }: any) => {
                console.log(data)
                if (data.status === 'success') {
                    const melds = data.move.data.melds.map(
                        (meld: any, index: number) => {
                            return { meldId: index, cards: meld }
                        }
                    )
                    setGame((prevState) => ({
                        ...prevState,
                        hand: parseHand(data.move.data.hand),
                        turnState: data.nextTurnState,
                        melds: melds,
                    }))

                }
                else if (data.status === 'error') {
                    console.log(data.error?.message)
                }
            })
            .catch((error: any) => {
                console.log(error)
                console.log('An error occured')
            })
    }

    const handleDiscard = () => {
        if (selectedCards(game.hand).length !== 1) {
            return
        }
        const card: any = reduceCard(selectedCards(game.hand).at(0))

        const data = JSON.stringify({
            action: 'move',
            move: {
                type: 'discard',
                data: {
                    card: card,
                },
            },
        })

        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                console.log(res)
                setGame((prevState) => ({
                    ...prevState,
                    hand: parseHand(res.data.hand),
                    discard: res.data.move?.data.discard,
                    turnState: res.data.nextTurnState,
                    turnCounter: res.data.nextTurnCounter,
                }))
            })
            .catch(() => {
                console.log('An error occured')
            })
    }

    const handleCardClick = ({ card }: any) => {
        setGame((prevState) => ({
            ...prevState,
            hand: prevState.hand.map((c) => {
                if (c.suit === card.suit && c.value === card.value) {
                    return { ...c, isSelected: !c.isSelected }
                }
                return c
            }),
        }))
    }

    const handleSortCard = () => {
        setGame((prevState) => ({
            ...prevState,
            hand: prevState.hand.sort((a, b) => {
                if (prevState.sortState) {
                    if (a.suit === b.suit) {
                        return (
                            ValueOrder.indexOf(a.value) -
                            ValueOrder.indexOf(b.value)
                        )
                    } else {
                        return (
                            SuitOrder.indexOf(a.suit) -
                            SuitOrder.indexOf(b.suit)
                        )
                    }
                } else {
                    if (a.value === b.value) {
                        return (
                            SuitOrder.indexOf(a.suit) -
                            SuitOrder.indexOf(b.suit)
                        )
                    } else {
                        return (
                            ValueOrder.indexOf(a.value) -
                            ValueOrder.indexOf(b.value)
                        )
                    }
                }
            }),
        }))
    }

    const handleSortCardClick = () => {
        setGame((prevState) => ({
            ...prevState,
            hand: prevState.hand.sort((a, b) => {
                if (prevState.sortState) {
                    if (a.suit === b.suit) {
                        return (
                            ValueOrder.indexOf(a.value) -
                            ValueOrder.indexOf(b.value)
                        )
                    } else {
                        return (
                            SuitOrder.indexOf(a.suit) -
                            SuitOrder.indexOf(b.suit)
                        )
                    }
                } else {
                    if (a.value === b.value) {
                        return (
                            SuitOrder.indexOf(a.suit) -
                            SuitOrder.indexOf(b.suit)
                        )
                    } else {
                        return (
                            ValueOrder.indexOf(a.value) -
                            ValueOrder.indexOf(b.value)
                        )
                    }
                }
            }),
            sortState: !prevState.sortState,
        }))
    }

    if (game?.gameState === 'lobby') {
        return <Lobby game={game} />
    }
    if (game?.gameState === 'in-game' || game?.gameState === 'roundEnd') {
        return (
            <Table
                game={game}
                handleClickPickup={handleClickPickup}
                handleClickDiscard={handleClickPickupDiscard}
                handleDiscard={handleDiscard}
                handlePlayerCardClick={handleCardClick}
                handleSortCardClick={handleSortCardClick}
                handleClickMeld={handleMeld}
                handleLayoff={handleLayoff}
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
