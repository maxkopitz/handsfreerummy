import { CardType, GameTurn, Meld as MeldType, RummyGame } from '../../Type'
import OpponentHand from './OpponentHand'
import PlayerHand from './PlayerHand'
import Card from './Card'
import CardBack from './CardBack'
import Container from '../ui/Container'
import Meld from './Meld'
import GameControls from './GameControls'
import { toast } from 'react-hot-toast'
import Dictaphone from './voice/Dictaphone'
import { useState } from 'react'
import { useProfile } from '../../hooks/Profile'

interface TableProps {
    game: RummyGame
    handleClickPickup: () => void
    handleClickDiscard: () => void
    handleDiscard: () => void
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
    const [isMicOn, setIsMicOn] = useState(false)

    const { profile } = useProfile()
    return (
        <Container>
            <div className="grid grid-cols-5 grid-rows-3 size-screen">
                <div className="col-start-1 row-span-1">
                    <GameControls game={game} />
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

                <div className="col-start-5 flex flex-row justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Discard Pile</h1>
                        <Card
                            card={{
                                suit: game.discard.suit,
                                value: game.discard.value,
                                isSelected:
                                    game.playerOrder ===
                                        game.turnState.turnCounter &&
                                    game.turnState.stage === 'start'
                                        ? true
                                        : false,
                            }}
                            onClick={handleClickDiscard}
                            isActive={
                                game.playerOrder ===
                                    game.turnState.turnCounter &&
                                game.turnState.stage === 'start'
                            }
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold">Pickup Pile</h1>
                        <CardBack
                            onClick={handleClickPickup}
                            isActive={
                                game.playerOrder ===
                                    game.turnState.turnCounter &&
                                game.turnState.stage === 'start'
                            }
                        />
                    </div>
                </div>
                {profile.settings.voiceControl && (
                    <Dictaphone
                        playerId={game.playerOrder}
                        hand={game.hand}
                        isTurn={game.playerOrder === game.turnState.turnCounter}
                        turnState={game.turnState}
                        handleDiscard={handleDiscard}
                        handleSelectCard={handlePlayerCardClick}
                        handleSortCards={handleSortCardClick}
                        handleCreateMeld={handleClickMeld}
                        handlePickupPickup={handleClickPickup}
                        handlePickupDiscard={handleClickDiscard}
                        micIsOn={isMicOn}
                        setIsMicOn={setIsMicOn}
                        handleLayoff={handleLayoff}
                        melds={game.melds}
                    />
                )}
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
                <div className="col-start-1 row-start-3 col-span-5 size-screen">
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
                        isMicOn={isMicOn}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Table
