import Board from './Board'
import { RummyGame, Suit, Value } from '../../Type'
import Button from '../ui/Button'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'
import Tutorial from '../tutorial/Tutorial'
import OpponentHand from './OpponentHand'
import PlayerHand from './PlayerHand'
import Card from './Card'
import CardBack from './CardBack'
import Container from '../ui/Container'
import axiosInstance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

interface TableProps {
    game: RummyGame
    handleClickPickup: any
    handleClickDiscard: any
}

const dummyRuns = [
    [
        { value: Value.A, suit: Suit.C },
        { value: Value.A, suit: Suit.D },
    ],
    [{ value: Value.K, suit: Suit.D }],
    [{ value: Value.J, suit: Suit.C }],
]

const Table = ({ game, handleClickPickup, handleClickDiscard }: TableProps) => {
    const { dispatch: dispatchModal } = useModal()
    const navigate = useNavigate()

    const handleLeaveGame = () => {
        const data = JSON.stringify({
            action: 'leave',
        })
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', data)
            .then(() => {
                navigate('/')
            })
            .catch(() => {
                console.log('Error occured while leaving.')
            })
    }

    return (
        <Container>
            <div className="grid grid-cols-5">
                <div>
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
                        <Button text={'Leave Game'} onClick={handleLeaveGame} />
                    </div>
                </div>
                {game.players.map((player, key) => (
                    <div key={key}>
                        <OpponentHand
                            playerId={player.playerOrder}
                            cardCount={player.cardCount}
                            playerDisplayName={player.displayName}
                            isTurn={player.playerOrder === game.turnCounter}
                        />
                    </div>
                ))}

                <div className="col-start-5 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Discard</h1>
                    <Card card={game.discard} onClick={handleClickDiscard} isActive={game.playerOrder === game.turnCounter} />
                </div>

                <div className="col-start-6 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Pickup</h1>
                    <CardBack onClick={handleClickPickup} />
                </div>

                <div className="mb-20 mt-20 col-span-3">
                    <Board playedRuns={dummyRuns} discard={game.discard} />
                </div>
                <div id="melds" className="col-start-2">
                    <h2 className="text-lg font-semibold">Melds</h2>
                </div>
                <div className="col-start-2 col-span-3">
                    <PlayerHand
                        playerId={game.playerOrder}
                        hand={game.hand}
                        isTurn={game.playerOrder === game.turnCounter}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Table
