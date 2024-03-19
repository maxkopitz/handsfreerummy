import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import { useProfile } from '../../hooks/Profile'

interface OpponentCardProps {
    card: CardType
    num?: number // number of cards in hand
}
//Back of the Card with number of cards in hand printed on top
const OpponentCard = ({ card, num }: OpponentCardProps) => {
    const { profile } = useProfile()
    let classes = classNames(
        'rounded-md text-center shadow-2xl',
        { 'text-2xl w-20 h-32': profile.settings.cardSize === 1 },
        { 'text-4xl w-28 h-40': profile.settings.cardSize === 2 },
        { 'text-6xl w-36 h-48': profile.settings.cardSize === 3 },
        { 'font-normal border-2': profile.settings.cardFontWeight === 1 },
        { 'font-bold border-4': profile.settings.cardFontWeight === 2 },
        { 'font-extrabold border-8': profile.settings.cardFontWeight === 3 },
        'bg-lime-700 border-lime-700 text-6xl text-white flex items-center justify-center'
    )

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
