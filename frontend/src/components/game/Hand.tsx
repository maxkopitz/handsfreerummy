import { Suit, Value } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'

interface HandProps {
    playerId?: number
    isPlayer: boolean
    hand: CardType[]
}

const Hand = ({ playerId, isPlayer, hand }: HandProps) => {
    const cardClasses = classNames('flex flex-row justify-center items-center')

    const handSize = hand.length

    // if not player - print one card with the number of cards in hand
    if (!isPlayer) {
        return (
            <div className="flex flex-col justify-center item-center w-max">
                <div className="flex flex-col items-center justify-center">
                    <h1>Player {playerId} </h1>
                </div>
                <div className={cardClasses}>
                    <Card
                        card={{ value: Value.A, suit: Suit.C }}
                        isBack={!isPlayer}
                        num={handSize}
                        isPickup={false}
                    />
                </div>
            </div>
        )
    }

    // if player - print all players cards in hand:
    return (
        <div className="flex flex-col justify-center item-center w-max">
            <div>
                <h1>
                    Player {playerId}: {handSize} cards{' '}
                </h1>
            </div>
            <div className={cardClasses}>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.C }}
                        isBack={!isPlayer}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.H }}
                        isBack={!isPlayer}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.H }}
                        isBack={!isPlayer}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.H }}
                        isBack={!isPlayer}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.Q, suit: Suit.S }}
                        isBack={!isPlayer}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.A, suit: Suit.D }}
                        isBack={!isPlayer}
                    />
                </div>
                <div className="m-2">
                    <Card
                        card={{ value: Value.K, suit: Suit.C }}
                        isBack={!isPlayer}
                    />
                </div>
            </div>
        </div>
    )
}

export default Hand
