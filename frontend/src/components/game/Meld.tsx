import classNames from 'classnames'
import { CardType, Suit } from '../../Type'
import MeldCard from './MeldCard'

interface MeldProps {
    card: CardType 
    meld: CardType[]
    num: number
}
const Meld = ({card, meld, num}: MeldProps) => {
    let classes = classNames(
        'flex justify-center items-center'
    )
    return (
        <>
            <div className={classes}>
                {meld.map((card, index) => (
                    <MeldCard card={{ value: card.value, suit: card.suit }} />
                ))}
                <h1>{num}</h1>
            </div>
        </>
    ) 
}

export default Meld