import { ValueOrder, SuitOrder, GameTurn, Meld, TurnState } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import { selectedCards } from '../../lib/parsers'
import { useProfile } from '../../hooks/Profile'

interface PlayerHandProps {
    playerId?: number
    hand: CardType[]
    isTurn: boolean
    turnState: TurnState
    handleDiscard: any
    handleCardClick: any
    handleSortCardClick: any
    handleClickMeld: any
    melds: Meld[]
}

const PlayerHand = ({
    playerId,
    hand,
    isTurn,
    turnState,
    handleDiscard,
    handleCardClick,
    handleSortCardClick,
    handleClickMeld,
}: PlayerHandProps) => {
    const { profile } = useProfile()

    const handSize = hand.length

    const [sortBy, setSortBy] = useState('Suit')

    const toggleSortBy = () => {
        handleSortCardClick()
        setSortBy(sortBy === 'Suit' ? 'Rank' : 'Suit')
    }

    return (
        <div className="flex flex-col justify-center item-center w-max h-max">
            <div>
                <h1 className="text-xl font-bold">
                    #{playerId}: {profile.displayName} has {handSize} cards{' '}
                    {isTurn && <span className="text-amber-400">★</span>}
                </h1>
            </div>
            <div>
                <Button
                    onClick={toggleSortBy}
                    text={'Sort Cards by ' + sortBy}
                ></Button>
                {turnState.stage === 'end' && (
                    <>
                        <Button
                            onClick={handleClickMeld}
                            text={'Create Meld'}
                            disabled={
                                !isTurn ||
                                turnState.stage !== 'end' ||
                                selectedCards(hand).length < 3
                            }
                        ></Button>
                        <Button
                            onClick={handleDiscard}
                            text={'Discard'}
                            disabled={
                                !isTurn ||
                                turnState.stage !== 'end' ||
                                selectedCards(hand).length !== 1
                            }
                        ></Button>
                    </>
                )}
            </div>
            <div className="flex flex-row flex-wrap justify-center item-center gap-1">
                {hand.map((card, index) => (
                    <div key={index}>
                        <Card
                            key={index}
                            card={card}
                            isActive={isTurn && turnState.stage === 'end'}
                            onClick={() => handleCardClick({ card: card })}
                        />
                        {profile.settings.voiceControl && <h2>{index + 1}</h2>}
                    </div >
                ))}
            </div>
        </div>
    )
}

export default PlayerHand
