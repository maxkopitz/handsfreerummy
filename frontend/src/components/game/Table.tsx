import Container from '../ui/Container'
import Board from './Board'
import Hand from './Hand'
import { RummyGame, Suit, Value } from '../../Type'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'
import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { socket, SocketEvents } from '../../api/socket'

const defaultGame: RummyGame = {
    gameId: '-1',
    players: [],
    gameState: 'lobby',
}

const Table = () => {
    const { dispatch: dispatchModal } = useModal()
    const navigate = useNavigate()
    const [game, setGame] = useState<RummyGame>(defaultGame)
    const [isConnected, setIsConnected] = useState(socket.connected)
    const dummyRuns = [
        [
            { value: Value.A, suit: Suit.C },
            { value: Value.A, suit: Suit.D },
        ],
        [{ value: Value.K, suit: Suit.D }],
        [{ value: Value.J, suit: Suit.C }],
    ]

    useEffect(() => {
        const connect = () => {
            setIsConnected(true)
        }
        const disconnect = () => {
            setIsConnected(false)
        }
        axiosInstance
            .post<any>('/games/1')
            .catch((error: AxiosError) => {
                console.log(error)
                navigate('/')
            })
            .then((res: any) => {
                const { data } = res
                console.log(data.game)
                setGame({
                    gameId: data.game.gameId,
                    players: data.game.players,
                    gameState: data.game.gameState,
                })
                socket.connect()
            })
        socket.on('connect', connect)
        socket.on('disconenct', disconnect)

        return () => {
            socket.disconnect()
        }
    }, [navigate])

    return (
        <Container>
            <Modal />
            <div className="grid grid-cols-5">
                <div>
                    <div>
                        <Button text={'Back to Main Menu'} link={'/'} />
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
                </div>
                <div className="col-start-2">
                    <Hand isPlayer={false} playerId={1} hand={[]} />
                </div>
                <div className="col-start-3">
                    <Hand isPlayer={false} playerId={2} hand={[]} />
                </div>
                <div className="col-start-4">
                    <Hand isPlayer={false} playerId={3} hand={[]} />
                </div>
                <div className="col-span-3">
                    <Board
                        playedRuns={dummyRuns}
                        discard={{ value: Value.Six, suit: Suit.H }}
                    />
                </div>
                <div className="col-start-2">
                    <h1>Melds</h1>
                </div>
                <div className="col-start-2 col-span-3">
                    <Hand isPlayer={true} playerId={4} hand={[]} />
                </div>
            </div>
        </Container>
    )
}

export default Table
