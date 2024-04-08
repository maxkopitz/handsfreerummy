import { CardType, GameTurn, Meld as MeldType, RummyGame } from '../../Type'
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
import Meld from './Meld'
import { toast } from 'react-hot-toast'
import Dictaphone from './voice/Dictaphone'

interface TableProps {
    game: RummyGame
    handleClickPickup: () => void
    handleClickDiscard: () => void
    handleDiscard: (card: CardType) => void
    handlePlayerCardClick: (card: CardType) => void
    handleSortCardClick: any
    handleClickMeld: (meld: MeldType) => void
    handleLayoff: any
}

const Table = ({
    game,
    handleClickPickup,
    handleClickDiscard,
    handleDiscard,
    handlePlayerCardClick,
    handleSortCardClick,
    handleClickMeld,
    handleLayoff,
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
                toast('Unable to leave!')
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
                            move: {game.turnState.stage}{' '}
                        </h1>
                    </div>
                </div>

                {game.players.map((player, key) => (
                    <div key={key}>
                        <OpponentHand
                            playerId={player.playerOrder}
                            cardCount={player.cardCount}
                            playerDisplayName={player.displayName}
                            isTurn={
                                player.playerOrder ===
                                game.turnState.turnCounter
                            }
                        />
                    </div>
                ))}

                <div className="col-start-5 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Discard Pile</h1>
                    <Card
                        card={game.discard}
                        onClick={handleClickDiscard}
                        isActive={
                            game.playerOrder === game.turnState.turnCounter &&
                            game.turnState.stage === 'start'
                        }
                    />
                </div>

                <div className="col-start-6 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Pickup Pile</h1>
                    <CardBack
                        onClick={handleClickPickup}
                        isActive={
                            game.playerOrder === game.turnState.turnCounter &&
                            game.turnState.stage === 'start'
                        }
                    />
                </div>

                <div className="row-start-2 col-start-2 col-span-3 flex flex-auto">
                    {game.melds.map((meld, index) => (
                        <Meld
                            meld={meld}
                            key={index}
                            onClick={handleLayoff}
                            isActive={
                                game.turnState.turnCounter ===
                                    game.playerOrder &&
                                game.turnState.stage === 'end'
                            }
                        />
                    ))}
                </div>
                <div className="col-start-2 col-span-3">
                    <PlayerHand
                        playerId={game.playerOrder}
                        hand={game.hand}
                        melds={game.melds}
                        isTurn={game.playerOrder === game.turnState.turnCounter}
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
