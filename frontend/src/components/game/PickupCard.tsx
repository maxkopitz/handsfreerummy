import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import { useProfile } from '../../hooks/Profile'

interface PickupCardProps {
    card: CardType
}

const Card = ({card}: PickupCardProps) => {
    const {profile} = useProfile()

    let classes = classNames(
        'border-green-700 bg-green-700 hover:bg-green-800 text-green-800'
    )

    return (
        <>
            <div className = {classes}>
            </div>
        </>
        
    )
}