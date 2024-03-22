import { Suit, Value } from '../../Type'
import Card from './Card'
import classNames from 'classnames'
import OpponentCard from './OpponentCard'

interface OpponentHandProps {
    playerId?: number
    cardCount: number
}

const OpponentHand = ({ playerId, cardCount }: OpponentHandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    const handSize = 7

    return (
        <div className="flex flex-col justify-center item-center w-max">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold">Player {playerId} </h1>
            </div>
            <div className={cardClasses}>
                <OpponentCard num = {cardCount} />
            </div>
        </div>
    )
}

export default OpponentHand