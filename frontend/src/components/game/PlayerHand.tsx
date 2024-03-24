import { Suit, Value, ValueOrder, SuitOrder } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'
import { useState } from 'react'
import Button from '../ui/Button'
// import { supports } from 'localforage'

interface PlayerHandProps {
    playerId?: number
    hand: CardType[]
}

const PlayerHand = ({ playerId, hand }: PlayerHandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    const handSize = 7

    const [sortedCards, setSortedCards] = useState([...hand])

    const sortCards = () => {
        const sorted = [...sortedCards].sort((a, b) => {
            if (a.suit === b.suit) {
                return ValueOrder.indexOf(a.value) - ValueOrder.indexOf(b.value)
            } else {
                return SuitOrder.indexOf(a.suit) - SuitOrder.indexOf(b.suit)
            }
        })
        setSortedCards(sorted)
    }

    // const sorts = ['Sort by Rank', 'Sort by Suit']

    // function ToggleSort() {
    //     const [sort, setSort] = useState(sorts[0])

    //     return(
    //        <div>
    //             <div>
    //                 <button
    //                     onClick={()=>useState(sorts[0])}>
    //                 </button>
    //                 <>
    //                     {sort == sorts[1] && <RecruiterForm /> }
    //                 </>
    //             </div>

    //             <div>
    //                 <button
    //                     onClick={()=>useState(sorts[1])}
    //                     type="button">
    //                 </button>
    //                 <>
    //                     {sort == sorts[0] && <CandidateForm /> }
    //                 </>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="flex flex-col justify-center item-center w-max">
            <div>
                <h1 className="text-xl font-bold">
                    Player {playerId}: {handSize} cards{' '}
                </h1>
            </div>

            <div className="flex flex-row gap-8"></div>

            <div>
                <Button text={'Sort Cards'} onClick={sortCards}></Button>
                <div className={cardClasses}>
                    {sortedCards.map((card, index) => (
                        <div className="m-2">
                            <Card key={index} card={card} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlayerHand
