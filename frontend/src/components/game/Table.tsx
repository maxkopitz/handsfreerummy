import { CardType, GameTurn, Meld as MeldType, RummyGame } from '../../Type'
import OpponentHand from './OpponentHand'
import PlayerHand from './PlayerHand'
import Card from './Card'
import CardBack from './CardBack'
import Container from '../ui/Container'
import Meld from './Meld'
import GameControls from './GameControls'

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
    handleLayoff
}: TableProps) => {




    return (
        <Container>
            <div className="grid grid-cols-5 grid-rows-3">
                <div>
                    <GameControls game={game} />
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


                <div className="col-start-5 flex flex-row justify-between">
                    <div>
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

                    <div>
                        <h1 className="text-xl font-bold">Pickup Pile</h1>
                        <CardBack
                            onClick={handleClickPickup}
                            isActive={
                                game.playerOrder === game.turnCounter &&
                                game.turnState === GameTurn.PICKUP
                            }
                        />
                    </div>
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
                <div className="col-start-2 row-start-3 col-span-3">
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
