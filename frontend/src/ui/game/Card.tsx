import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import { useProfile } from '../../providers/Profile'

//Pick Card Design
interface CardProps {
    card: CardType
    direction: string
    isBack?: boolean
}

const Card = ({ card, direction, isBack }: CardProps) => {
    const { profile } = useProfile()
    let classes = classNames(
        'w-24 h-32 border-2 rounded-md text-3xl text-center',
        {
            'text-red-500 border-red-500 hover:bg-red-500 hover:text-white':
                card.suit === Suit.H || card.suit === Suit.D,
        },
        {
            'text-black-500 border-slate-950 hover:bg-neutral-950 hover:text-white':
                card.suit === Suit.S || card.suit === Suit.C,
        }
    )

    let classesBack = classNames(
        'w-24 h-32 border-2 rounded-md text-3xl text-center',
        'text-black-500 border-blue-500 bg-blue-500'
    )

    // ['♠', '♣', '♥', '♦']
    let suitSymbol = ''
    if (card.suit === Suit.S) {
        suitSymbol = '♠'
    } else if (card.suit === Suit.C) {
        suitSymbol = '♣'
    } else if (card.suit === Suit.H) {
        suitSymbol = '♥'
    } else if (card.suit === Suit.D) {
        suitSymbol = '♦'
    }

    // return front of card
    if (!isBack) {
        return (
            <>
                <div className={classes}>
                    <div>{card.value}</div>
                    <div>{suitSymbol}</div>
                </div>
            </>
        )
    } else {
        // return back of card
        return <div className={classesBack}> </div>
    }
}

export default Card
