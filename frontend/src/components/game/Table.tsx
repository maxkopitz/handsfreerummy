import Board from './Board'
import { CardType, GameTurn, RummyGame, Suit, Value } from '../../Type'
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
import Meld from './Meld'

interface TableProps {
    game: RummyGame
    handleClickPickup: any
    handleClickDiscard: any
    handleDiscard: any
    handlePlayerCardClick: any
    handleSortCardClick: any
    handleClickMeld: any
    handleLayoff: any
}

const dummyRuns = [
    [
        { value: Value.A, suit: Suit.C, isSelected: false },
        { value: Value.A, suit: Suit.D, isSelected: false },
    ],
    [{ value: Value.K, suit: Suit.D, isSelected: false }],
    [{ value: Value.J, suit: Suit.C, isSelected: false }],
]

const Table = ({
    game,
    handleClickPickup,
    handleClickDiscard,
    handleDiscard,
    handlePlayerCardClick,
    handleSortCardClick,
    handleClickMeld,
    handleLayoff
}: TableProps) => {
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
                        <h1 className="text-xl font-bold">
                            Awaiting move: {game.turnState}{' '}
                        </h1>
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
                    <h1 className="text-xl font-bold">Discard Pile</h1>
                    <Card
                        card={game.discard}
                        onClick={handleClickDiscard}
                        isActive={
                            game.playerOrder === game.turnCounter &&
                            game.turnState === GameTurn.PICKUP
                        }
                    />
                </div>

                <div className="col-start-6 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Pickup Pile</h1>
                    <CardBack
                        onClick={handleClickPickup}
                        isActive={
                            game.playerOrder === game.turnCounter &&
                            game.turnState === GameTurn.PICKUP
                        }
                    />
                </div>

                <div className="mb-20 mt-20 col-span-3">
                    <Board playedRuns={dummyRuns} discard={game.discard} />
                </div>
                <div className="row-start-2 col-start-2 col-span-3 flex flex-auto">
                    {game.melds.map((meld, index) => (
                        <Meld
                            meld={meld}
                            key={index}
                            onClick={handleLayoff}
                            isActive={
                                game.turnCounter === game.playerOrder &&
                                game.turnState === 'meld'
                            }
                        />
                    ))}
                </div>
                <div className="col-start-2 col-span-3">
                    <PlayerHand
                        playerId={game.playerOrder}
                        hand={game.hand}
                        melds={game.melds}
                        isTurn={game.playerOrder === game.turnCounter}
                        turnState={game.turnState}
                        handleDiscard={handleDiscard}
                        handleCardClick={handlePlayerCardClick}
                        handleSortCardClick={handleSortCardClick}
                        handleClickMeld={handleClickMeld}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Table
