import { Suit, Value } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'
import { useState } from 'react'
// import { supports } from 'localforage'

interface PlayerHandProps {
    playerId?: number
    hand: CardType[]
}

const PlayerHand = ({ playerId, hand }: PlayerHandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    const handSize = 7

    hand = [
        { value: Value.A, suit: Suit.C },
        { value: Value.Seven, suit: Suit.H },
        { value: Value.Eight, suit: Suit.C },
        { value: Value.K, suit: Suit.S },
        { value: Value.Four, suit: Suit.H },
        { value: Value.Two, suit: Suit.D },
        { value: Value.Seven, suit: Suit.C },
    ]

    const [sortedCards, setSortedCards] = useState([...hand]);

    const sortCards = () => {
        const sorted = [...sortedCards].sort((a, b) => {
            if (a.suit === b.suit) {
                return Number(b.value) - Number(a.value);
            } else {
                return a.suit.localeCompare(b.suit);
            }
        });
        setSortedCards(sorted);

    };

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
                <button onClick={sortCards}>Sort Cards</button>
                <div className={cardClasses}>
                    {sortedCards.map((card, index) => (
                        <div className="m-2">
                            <Card
                                key={index}
                                card={card}
                                isBack={!true}
                            />
                        </div>
                    ))}

                </div>
            </div>


            {/* <div className={cardClasses}>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.C }}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.H }}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.S }}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.D }}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.Q, suit: Suit.S }}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.Eight, suit: Suit.D }}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.K, suit: Suit.C }}
                    />
                </div>
            </div> */}
        </div>
    )
}

export default PlayerHand
