import { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
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

import { toast } from 'react-hot-toast'

const Game = () => {
    const navigate = useNavigate()
    const { profile } = useProfile()
    const { gameId } = useParams()

    const [game, setGame] = useState<RummyGame>({
        gameId: '0',
        gameState: '',
        players: [],
        hand: [],
        sortState: true,
        discard: { value: Value.J, suit: Suit.C, isSelected: false },
        melds: [],
        playerOrder: 0,
        isOwner: false,
        turnState: {
            turnCounter: 1,
            stage: 'start',
        },
    })

    useEffect(() => {
        const joinGame = async () => {
            const data = JSON.stringify({
                action: 'join',
                displayName: profile.displayName,
            })
            await axiosInstance
                .post<any>('/games/' + gameId + '/', data)
                .then((res: any) => {
                    const { data } = res
                    if (data.status === 'error') {
                        toast.error(data.error.message)
                        navigate(data.error.redirect)
                        return
                    }
                    const { result } = data
                    const melds = result.game.melds.map(
                        (meld: any, index: number) => {
                            return { meldId: index, cards: meld }
                        }
                    )
                    setGame({
                        gameId: result.game.gameId,
                        players: result.game.players,
                        gameState: result.game.gameState,
                        hand: parseHand(result.game.hand),
                        sortState: true,
                        melds: melds,
                        discard: result.game?.discard,
                        playerOrder: result.game?.playerOrder,
                        isOwner: result.game?.isOwner,
                        turnState: result.game?.turnState,
                    })
                })
                .catch(() => {
                    toast.error('An error occured joining game ' + gameId)
                    navigate('/')
                })
        }
        joinGame()
    }, [gameId, navigate, profile.displayName])

    useEffect(() => {
        socket.on(SocketEvents.PLAYER_JOINED, (data: any) => {
            if (game.gameState === 'lobby') {
                setGame((prevState) => ({
                    ...prevState,
                    players: data.data.players,
                }))
                toast.success(
                    <span>
                        <b>{data?.message.title}</b> {data?.message.body}
                    </span>,
                    {
                        duration: 3000,
                    }
                )
            }
        })

        socket.on(SocketEvents.PLAYER_LEFT, (data: any) => {
            if (data?.data?.gameEnded === true) {
                toast.error('Game ended!', {
                    duration: 3000,
                })
                navigate('/')
                return
            }

            toast.error(
                <span>
                    <b>{data?.message.title}</b> {data?.message.body}
                </span>,
                {
                    duration: 3000,
                }
            )
        })

        socket.on(SocketEvents.GAME_STARTED, (data: any) => {
            toast(
                <div className="text-center">
                    <span>Game has started!</span>
                    <br />
                    <span> It is player ones turn.</span>
                    <br />
                    <span>
                        To view how to play please click the <b>Tutorial</b>{' '}
                        button on the upper left side of the screen.
                    </span>
                </div>,
                {
                    duration: 5000,
                    position: 'top-center',
                }
            )
            setGame({
                ...game,
                hand: parseHand(data.game.hand),
                discard: data.game.discard,
                gameState: 'in-game',
                players: data.game.players,
                playerOrder: data.game.playerOrder,
                turnState: data.game.turnState,
            })
        })

        socket.on(SocketEvents.PLAYED_MOVE, (data: any) => {
            toast.success(
                <span>
                    <b>{data?.message.title}</b> {data?.message.body}
                </span>,
                {
                    duration: 6000,
                }
            )
            if (data?.move.type === 'pickup') {
                setGame((prevState) => ({
                    ...prevState,
                    turnState: data.turnState,
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
                    turnState: data.turnState,
                    melds: melds,
                    players: data.move.data.players,
                }))
            } else if (data?.move.type === 'discard') {
                if (data.turnState.turnCounter === game.playerOrder) {
                    toast.success('It is your turn.')
                } else {
                    toast.success(
                        'It is player ' +
                            data.turnState.turnCounter +
                            "'s turn."
                    )
                }
                setGame((prevState) => ({
                    ...prevState,
                    discard: parseCard(data.move.data.discard),
                    players: data.move.data.players,
                    turnState: data.turnState,
                }))
            } else if (data?.move.type === 'roundEnd') {
                navigate('/')
            }
        })

        return () => {
            socket.off(SocketEvents.PLAYER_JOINED)
            socket.off(SocketEvents.GAME_STARTED)
            socket.off(SocketEvents.PLAYED_MOVE)
            socket.off(SocketEvents.PLAYER_LEFT)
        }
    }, [game.gameState])

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
                toast.success('You picked up a card.')
                setGame((prevState) => ({
                    ...prevState,
                    hand: [
                        ...prevState.hand,
                        { ...res.data.move.data.card, isSelected: false },
                    ],
                    turnState: res.data.turnState,
                }))
            })
            .catch(() => {
                toast.error('An error occured picking up.')
            })
    }

    const handleClickPickupDiscard = () => {
        if (JSON.stringify(game.discard) === '{}') {
            toast.error('No card to pick up from the discard pile.')
            return
        }
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
                toast.success('You picked up a card.')
                setGame((prevState) => ({
                    ...prevState,
                    hand: [...prevState.hand, res.data.move.data.card],
                    discard: res.data.move?.data.discard,
                    turnState: res.data.turnState,
                }))
            })
            .catch(() => {
                toast.error('An error occured picking up.')
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
                    cards: cards,
                },
            },
        })

        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                const { data } = res
                if (data.status === 'error') {
                    toast.error(data.error.message)
                    return
                }
                const melds = res.data.move.data.melds.map(
                    (meld: any, index: number) => {
                        return { meldId: index, cards: meld }
                    }
                )
                toast.success('You created a meld card!')
                setGame((prevState) => ({
                    ...prevState,
                    hand: parseHand(res.data.move.data.hand),
                    turnState: res.data.turnState,
                    melds: melds,
                }))
            })
            .catch(() => {
                console.log('An error occured')
            })
    }

    const handleLayoff = (meld: Meld) => {
        if (selectedCards(game.hand).length !== 1) {
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
                if (data.status === 'error') {
                    toast.error(data.error.message)
                    return
                }
                if (data.status === 'success') {
                    const melds = data.move.data.melds.map(
                        (meld: any, index: number) => {
                            return { meldId: index, cards: meld }
                        }
                    )
                    toast.success('You layed off a card!')
                    setGame((prevState) => ({
                        ...prevState,
                        hand: parseHand(data.move.data.hand),
                        turnState: data.turnState,
                        melds: melds,
                    }))
                } else if (data.status === 'error') {
                    toast.error('An error occured while laying off.')
                }
            })
            .catch(() => {
                toast.error('An error occured while laying off.')
            })
    }

    const handleDiscard = (): void => {
        const selectedCardLength = selectedCards(game.hand).length
        if (selectedCardLength !== 1) {
            toast.error('Please select one card to discard.')
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
                toast.success('You discarded a card. Your turn is over.')
                setGame((prevState) => ({
                    ...prevState,
                    hand: parseHand(res.data.hand),
                    discard: res.data.move?.data.discard,
                    turnState: res.data.turnState,
                }))
            })
            .catch(() => {
                console.log('An error occured')
            })
    }

    const handleCardClick = (card: CardType): void => {
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

    const handleSortCardClick = (): void => {
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
