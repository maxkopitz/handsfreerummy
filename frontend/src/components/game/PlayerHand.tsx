import { ValueOrder, SuitOrder, GameTurn } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import { selectedCards } from '../../lib/parsers'

interface PlayerHandProps {
    playerId?: number
    hand: CardType[]
    isTurn: boolean
    turnState: GameTurn
    handleDiscard: any
    handleCardClick: any
}

const PlayerHand = ({
    playerId,
    hand,
    isTurn,
    turnState,
    handleDiscard,
    handleCardClick }: PlayerHandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    const handSize = hand.length

    const [sortedCards, setSortedCards] = useState([...hand])
    const [sortBy, setSortBy] = useState('Suit')


    const sortCards = () => {
        const sorted = [...hand].sort((a, b) => {
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

    useEffect(() => {
        sortCards()
    }, [hand])

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
                <Button
                    onClick={toggleSortBy}
                    text={'Create Meld'}
                    disabled={
                        !isTurn
                        || (turnState !== GameTurn.MELD && turnState !== GameTurn.DISCARD)
                        || selectedCards(hand).length < 3
                    }
                ></Button>
                <Button
                    onClick={handleDiscard}
                    text={'Discard'}
                    disabled={
                        !isTurn ||
                        (turnState !== GameTurn.MELD && turnState !== GameTurn.DISCARD)
                        || selectedCards(hand).length !== 1}
                ></Button>
                <div className={cardClasses}>
                    {hand.map((card, index) => (
                        <div key={index} className="m-2">
                            <Card
                                card={card}
                                isActive={isTurn && (turnState === GameTurn.MELD || turnState === GameTurn.DISCARD)}
                                onClick={() => handleCardClick({ card: card })} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlayerHand
