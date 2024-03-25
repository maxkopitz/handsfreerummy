import { ValueOrder, SuitOrder } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'
import { useState } from 'react'
import Button from '../ui/Button'

interface PlayerHandProps {
    playerId?: number
    hand: CardType[]
    isTurn: boolean
}

const PlayerHand = ({ playerId, hand, isTurn }: PlayerHandProps) => {
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
                    {isTurn && <span className="text-amber-400">★</span>}
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
                        {/* TODO: isTurn and Correct stage*/}
                            <Card card={card} isActive={isTurn}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlayerHand
