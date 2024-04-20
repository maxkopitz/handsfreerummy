import classNames from 'classnames'
import { CardType, Meld as MeldType, Suit } from '../../Type'
import MeldCard from './MeldCard'

interface MeldProps {
    meld: MeldType
    isActive: boolean
    onClick?: any
}
const Meld = ({ meld, isActive = false, onClick }: MeldProps) => {
    let classes = classNames(
        'flex flex-col justify-center items-center mt-2 ml-2'
    )
    const handleClickMeld = () => {
        onClick(meld)
    }
    return (
        <div className={classes} onClick={handleClickMeld}>
            <div
                className="flex justify-center items-center flex-row p-3 rounded shadow-lg bg-indigo-200"
            >
                {meld.cards.map((card, index) => (
                    <div key={index}>
                        <MeldCard
                            card={{
                                value: card.value,
                                suit: card.suit,
                                isSelected: false,
                            }}
                        />
                    </div>
                ))}
            </div>
            <h1 className="text-xl font-bold">Meld #{meld.meldId + 1}</h1>
        </div>
    )
}

export default Meld
