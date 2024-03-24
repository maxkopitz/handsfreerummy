import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import { useProfile } from '../../hooks/Profile'

interface Card2Props {
    card: CardType 
}
const Card = ({card}: Card2Props) => {
    const { profile } = useProfile()
    let classes = classNames(
        'rounded-md text-center shadow-lg bg-white',
        {
            'text-red-500 border-red-500 hover:bg-red-500 hover:text-white flex flex-col items-center justify-center':
                (card.suit === Suit.H || card.suit === Suit.D),
        },
        {
            'text-black-500 border-slate-950 hover:bg-neutral-950 hover:text-white flex flex-col items-center justify-center':
                (card.suit === Suit.S || card.suit === Suit.C),
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
    if (card.suit === Suit.S) {
        suitSymbol = '♠'
    } else if (card.suit === Suit.C) {
        suitSymbol = '♣'
    } else if (card.suit === Suit.H) {
        suitSymbol = '♥'
    } else if (card.suit === Suit.D) {
        suitSymbol = '♦'
    }

    return (
        <>
            <div className={classes}>
                    <>
                        <div>{suitSymbol}</div>
                        <div>{card.value}</div>
                        <div>{suitSymbol}</div>
                    </>
            </div>
        </>
    ) 
}

export default Card