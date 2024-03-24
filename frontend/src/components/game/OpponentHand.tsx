import { Suit, Value } from '../../Type'
import Card from './Card'
import classNames from 'classnames'
import OpponentCard from './OpponentCard'

interface OpponentHandProps {
    playerId?: number
    cardCount: number
    playerDisplayName: string
    isTurn: boolean
}

const OpponentHand = ({
    playerId,
    cardCount,
    playerDisplayName,
    isTurn,
}: OpponentHandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    return (
        <div className="flex flex-col justify-center item-center w-max">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold">
                    Player {playerDisplayName} {playerId}{' '}
                    {isTurn && 'It is my turn!'}
                </h1>
            </div>
            <div className={cardClasses}>
                <OpponentCard num={cardCount} />
            </div>
        </div>
    )
}

export default OpponentHand
