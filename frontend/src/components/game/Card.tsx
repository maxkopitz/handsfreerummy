import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import { useProfile } from '../../hooks/Profile'

//Pick Card Design
interface CardProps {
    card: CardType
    isBack?: boolean
    cardSize?: number
    num?: number // number of cards in hand
    isPickup?: boolean // false if not discard
}

const Card = ({ card, isBack, num, isPickup }: CardProps) => {
    const { profile } = useProfile()
    let classes = classNames(
        'rounded-md text-center shadow-lg',
        { 'bg-white': !isBack },
        {
            'text-red-500 border-red-500 hover:bg-red-500 hover:text-white flex flex-col items-center justify-center':
                (card.suit === Suit.H || card.suit === Suit.D) && !isBack,
        },
        {
            'text-black-500 border-slate-950 hover:bg-neutral-950 hover:text-white flex flex-col items-center justify-center':
                (card.suit === Suit.S || card.suit === Suit.C) && !isBack,
        },
        { 'text-2xl w-20 h-32': profile.settings.cardSize === 1 },
        { 'text-4xl w-28 h-40': profile.settings.cardSize === 2 },
        { 'text-6xl w-36 h-48': profile.settings.cardSize === 3 },
        { 'font-normal border-2': profile.settings.cardFontWeight === 1 },
        { 'font-bold border-4': profile.settings.cardFontWeight === 2 },
        { 'font-extrabold border-8': profile.settings.cardFontWeight === 3 },
        { 'border-green-700 bg-green-700 hover:bg-green-800': isBack && isPickup},
        { 'text-green-800': isBack && isPickup },
        {
            'bg-lime-700 border-lime-700 text-6xl text-white shadow-2xl flex items-center justify-center':
                isBack && !isPickup,
        }
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

    // isBack is true = back of card
    //card is back and not part of discard pile
    if (isBack && !isPickup) {
        return (
            <>
                <div className={classes}>
                    {
                        <>
                            <div>{num}</div>
                        </>
                    }
                </div>
            </>
        )
    }

    // return front of card if !isBack, otherwise return empty card for discard pile
    return (
        <>
            <div className={classes}>
                {!isBack && (
                    <>
                        <div>{suitSymbol}</div>
                        <div>{card.value}</div>
                        <div>{suitSymbol}</div>
                    </>
                )}
            </div>
        </>
    )
}

export default Card
