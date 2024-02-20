import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import { useProfile } from '../../hooks/Profile'

//Pick Card Design
interface CardProps {
    card: CardType
    direction: string
    isBack?: boolean
    cardSize?: number
    num?: number // number of cards in hand
    isDiscard?: boolean // false if not discard
}

const Card = ({ card, direction, isBack, num, isDiscard }: CardProps) => {
    const { profile } = useProfile()
    let classes = classNames(
        'rounded-md text-center shadow-lg',
        {
            'text-red-500 border-red-500 hover:bg-red-500 hover:text-white':
                (card.suit === Suit.H || card.suit === Suit.D) && !isBack,
        },
        {
            'text-black-500 border-slate-950 hover:bg-neutral-950 hover:text-white':
                (card.suit === Suit.S || card.suit === Suit.C) && !isBack,
        },
        { 'text-2xl w-20 h-28': profile.cardSize === 1 },
        { 'text-4xl w-28 h-36': profile.cardSize === 2 },
        { 'text-6xl w-36 h-44': profile.cardSize === 3 },
        { 'text-normal border-2': profile.cardFontWeight === 1 },
        { 'text-bold border-4': profile.cardFontWeight === 2 },
        { 'text-extrabold border-8': profile.cardFontWeight === 3 },
        { 'text-green-800 border-green-800 bg-green-800': isBack }
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
    if (isBack && !isDiscard){ 
        return (
            <>
            <div className={classes}>
                {(
                    <>
                        <div>num</div>
                    </>
                )}
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
                        <div>{card.value}</div>
                        <div>{suitSymbol}</div>
                    </>
                )}
            </div>
            
        </>
    )

}

export default Card
