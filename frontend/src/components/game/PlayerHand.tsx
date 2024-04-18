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
            <div className = "flex">
                <Button
                    onClick={toggleSortBy}
                    text={'Sort Cards by ' + sortBy}
                ></Button>
                
                {!isTurn && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>} 
              
                {isTurn && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-12">
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                </svg>}

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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerHand
