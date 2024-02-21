import { CardType } from '../../Type'
import Card from './Card'

//Implement Game Logic and Design Tutorial and Implement Game Layout
interface BoardProps {
    discard: CardType
    playedRuns: CardType[][] // 2d array where playedRuns[0] = array of Cards in the order of the run
}
const Board = ({ discard, playedRuns }: BoardProps) => {
    return (
        <div className="grid grid-cols-subgrid justify-center items-center">
            <div className="col-start-3 flex flex-col items-center justify-center">
                <h1>Discard</h1>
                <Card card={discard} />
            </div>
            <div className="col-start-4 flex flex-col items-center justify-center">
                <h1>Pickup</h1>
                <Card card={discard} isBack={true} isPickup={true} />
            </div>
        </div>
    )
}

export default Board
