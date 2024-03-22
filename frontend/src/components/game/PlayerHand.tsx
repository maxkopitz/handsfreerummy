import { Suit, Value } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'
import { useState } from 'react'

interface PlayerHandProps {
    playerId?: number
    hand: CardType[]
}

const PlayerHand = ({ playerId, hand }: PlayerHandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    const handSize = 7

    const sorts = ['Sort by Rank', 'Sort by Suit']

    function ToggleSort() {
        const [sort, setSort] = useState(sorts[0])

        return 'hi'
        // <div>
        //     <button
        //         onClick={()=>useState(sorts[0])}>
        //         Recruiter
        //     </button>
        //     <>
        //         {/* {active && <RecruiterForm /> } */}
        //     </>
        // </div>

        // <div>
        //     <button
        //         onClick={()=>setActive(false)}
        //         type="button">
        //         Candidate
        //     </button>
        //     <>
        //         {!active && <CandidateForm /> }
        //     </>
        // </div>
    }

    return (
        <div className="flex flex-col justify-center item-center w-max">
            <div>
                <h1 className="text-xl font-bold">
                    Player {playerId}: {handSize} cards{' '}
                </h1>
            </div>

            <div className="flex flex-row gap-8"></div>
            <div className={cardClasses}>
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
            </div>
        </div>
    )
}

export default PlayerHand
