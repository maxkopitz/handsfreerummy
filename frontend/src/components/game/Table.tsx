
import Board from './Board'
import { RummyGame, Suit, Value } from '../../Type'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'
import Tutorial from '../tutorial/Tutorial'
import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { socket, SocketEvents } from '../../api/socket'
import OpponentHand from './OpponentHand'
import PlayerHand from './PlayerHand'
import { CardType } from '../../Type'
import Card from './Card'
import Container from '../ui/Container'

const defaultGame: RummyGame = {
    gameId: '-1',
    players: [],
    gameState: 'lobby',
}
const dummyRuns = [
    [
        { value: Value.A, suit: Suit.C },
        { value: Value.A, suit: Suit.D },
    ],
    [{ value: Value.K, suit: Suit.D }],
    [{ value: Value.J, suit: Suit.C }],
]

const Table = () => {
    const { dispatch: dispatchModal } = useModal()
    const navigate = useNavigate()
    const [game, setGame] = useState<RummyGame>(defaultGame)

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
                socket.emit('player-joined', { 'displayName': 'test'})

                socket.on(SocketEvents.GAME_START, () => {

                })
            })
    }, [navigate])

    const handleLeaveGame = () => {
        axiosInstance
            .post<any>('/games/1/', {
                data: {
                    action: 'leave',
                },
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
            .then((res: any) => {
                navigate('/')
            })
    }

    return (
        <Container>
            <Modal />
            <div className="grid grid-cols-5">
                <div>
                    <div>
                        <Button text={'Leave Game'} onClick={handleLeaveGame} />
                    </div>
                    <div>
                        <Button
                            text={'Settings'}
                            onClick={() =>
                                dispatchModal({
                                    type: 'showModal',
                                    modal: {
                                        title: 'Settings',
                                        component: <Settings />,
                                    },
                                })
                            }
                        />
                    </div>
                    <div>
                        <Button
                            text={'Tutorial'}
                            onClick={() =>
                                dispatchModal({
                                    type: 'showModal',
                                    modal: {
                                        title: 'Tutorial',
                                        component: <Tutorial />,
                                    },
                                })
                            }
                        />
                    </div>
                </div>

                <div className="col-start-2">
                    <OpponentHand playerId={1} cardCount={7} />
                </div>

                <div className="col-start-3">
                    <OpponentHand playerId={2} cardCount={7} />
                </div>

                <div className="col-start-4">
                    <OpponentHand playerId={3} cardCount={7} />
                </div>

                <div className="col-start-5">
                    <h1>Discard</h1>

                    <Card card={{ suit: Suit.C, value: Value.A }} />
                </div>

                <div className="col-start-6">
                    <h1>Pickup</h1>
                    <Card card={{ suit: Suit.C, value: Value.A }} isBack={true} isPickup={true} />
                </div>

                <div className="mb-20 mt-20 col-span-3">
                    <Board
                        playedRuns={dummyRuns}
                        discard={{ value: Value.Six, suit: Suit.H }}
                    />
                </div>
                <div className="col-start-2">
                    <h2 className="text-lg font-semibold">Melds</h2>
                </div>
                <div className="col-start-2 col-span-3">
                    <PlayerHand playerId={4} hand={[]} />
                </div>
            </div>
        </Container>
    )
}

export default Table
