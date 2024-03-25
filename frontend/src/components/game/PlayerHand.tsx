import { ValueOrder, SuitOrder, GameTurn } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'
import { useState } from 'react'
import Button from '../ui/Button'

interface PlayerHandProps {
    playerId?: number
    hand: CardType[]
    isTurn: boolean
    turnState: GameTurn
    handleDiscard: any
}

const PlayerHand = ({ playerId, hand, isTurn, turnState, handleDiscard }: PlayerHandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    const handSize = hand.length

    const [sortedCards, setSortedCards] = useState([...hand])
    const [sortBy, setSortBy] = useState('Suit')

    const sortCards = () => {
        const sorted = [...sortedCards].sort((a, b) => {
            if (sortBy === 'Suit') {
                if (a.suit === b.suit) {
                    return (
                        ValueOrder.indexOf(a.value) -
                        ValueOrder.indexOf(b.value)
                    )
                } else {
                    return SuitOrder.indexOf(a.suit) - SuitOrder.indexOf(b.suit)
                }
            } else {
                if (a.value === b.value) {
                    return SuitOrder.indexOf(a.suit) - SuitOrder.indexOf(b.suit)
                } else {
                    return (
                        ValueOrder.indexOf(a.value) -
                        ValueOrder.indexOf(b.value)
                    )
                }
            }
        })
        setSortedCards(sorted)
    }

    const toggleSortBy = () => {
        sortCards()
        setSortBy(sortBy === 'Suit' ? 'Rank' : 'Suit')
    }

    return (
        <div className="flex flex-col justify-center item-center w-max">
            <div>
                <h1 className="text-xl font-bold">
                    Player {playerId}: {handSize} cards{' '}
                    {isTurn && 'It is my turn!'}
                </h1>
            </div>

            <div className="flex flex-row gap-8"></div>

            <div>
                <Button
                    onClick={toggleSortBy}
                    text={'Sort Cards by ' + sortBy}
                ></Button>
                <div className={cardClasses}>
                    {sortedCards.map((card, index) => (
                        <div key={index} className="m-2">
                            <Card
                                card={card}
                                isActive={isTurn && (turnState === GameTurn.MELD || turnState === GameTurn.DISCARD)}
                                onClick={() => handleDiscard({card: card})} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlayerHand
