import classNames from 'classnames'
import { useProfile } from '../../hooks/Profile'

interface CardBackProps {
    onClick?: any
}
const CardBack = ({ onClick }: CardBackProps) => {
    const { profile } = useProfile()
    let classes = classNames(
        'w-24 h-32 border-2 rounded-md text-3xl text-center',
        'border-green-700 bg-green-700 hover:bg-green-800',
        { 'text-2xl w-20 h-32': profile.settings.cardSize === 1 },
        { 'text-4xl w-28 h-40': profile.settings.cardSize === 2 },
        { 'text-6xl w-36 h-48': profile.settings.cardSize === 3 },
        { 'font-normal border-2': profile.settings.cardFontWeight === 1 },
        { 'font-bold border-4': profile.settings.cardFontWeight === 2 },
        { 'font-extrabold border-8': profile.settings.cardFontWeight === 3 }
    )

    return (
        <div className={classes} onClick={onClick}>
            {' '}
        </div>
    )
}

export default CardBack
