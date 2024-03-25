import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import { useProfile } from '../../hooks/Profile'

interface CardProps {
    card: CardType
    onClick?: any
    isActive: boolean
}
const Card = ({ card, onClick, isActive }: CardProps) => {
    const { profile } = useProfile()
    let classes = classNames(
        'rounded-md text-center shadow-lg bg-white',
        {
            'text-red-500 border-red-500  flex flex-col items-center justify-center':
                card.suit === Suit.H || card.suit === Suit.D,
        },
        {
            'hover:bg-red-500 hover:text-white':
                (card.suit === Suit.H || card.suit === Suit.D) && isActive,
        },
        {
            'text-black-500 border-slate-950 flex flex-col items-center justify-center':
                card.suit === Suit.S || card.suit === Suit.C,
        },
        {
            'hover:bg-neutral-950 hover:text-white':
                (card.suit === Suit.S || card.suit === Suit.C) && isActive,
        },
        { 'text-2xl w-20 h-32': profile.settings.cardSize === 1 },
        { 'text-4xl w-28 h-40': profile.settings.cardSize === 2 },
        { 'text-6xl w-36 h-48': profile.settings.cardSize === 3 },
        { 'font-normal border-2': profile.settings.cardFontWeight === 1 },
        { 'font-bold border-4': profile.settings.cardFontWeight === 2 },
        { 'font-extrabold border-8': profile.settings.cardFontWeight === 3 }
    )

    // ['♠', '♣', '♥', '♦']
    let suitSymbol = ''
    if (card.suit === Suit.S.valueOf()) {
        suitSymbol = '♠'
    } else if (card.suit === Suit.C) {
        suitSymbol = '♣'
    } else if (card.suit === Suit.H) {
        suitSymbol = '♥'
    } else if (card.suit === Suit.D) {
        suitSymbol = '♦'
    }
    if (isActive) {

        return (
            <>
                <div className={classes} onClick={onClick}>
                    <div>
                        <div>{suitSymbol}</div>
                        <div>{card.value}</div>
                        <div>{suitSymbol}</div>
                    </div>
                </div>
            </>
        )

    }

    return (
        <>
            <div className={classes}>
                <div>
                    <div>{suitSymbol}</div>
                    <div>{card.value}</div>
                    <div>{suitSymbol}</div>
                </div>
            </div>
        </>
    )
}

export default Card
