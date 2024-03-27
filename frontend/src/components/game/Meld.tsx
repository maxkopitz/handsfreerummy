import classNames from 'classnames'
import { CardType, Meld as MeldType, Suit } from '../../Type'
import MeldCard from './MeldCard'

interface MeldProps {
    meld: MeldType
    isActive: boolean
    onClick?: any
}
const Meld = ({ meld, isActive = false, onClick = () => {} }: MeldProps) => {
    let classes = classNames('flex justify-center items-center')
    return (
        <div className={classes} onClick={onClick}>
            {meld.cards.map((card, index) => (
                <MeldCard
                    card={{
                        value: card.value,
                        suit: card.suit,
                        isSelected: false,
                    }}
                />
            ))}
        </div>
    )
}

export default Meld
