import { CardType } from '../../Type'
import Card from './Card'

//Implement Game Logic and Design Tutorial and Implement Game Layout
interface BoardProps {
    discard: CardType
    playedRuns: CardType[][] // 2d array where playedRuns[0] = array of Cards in the order of the run
}
const Board = ({ discard, playedRuns }: BoardProps) => {
    return (
        <div className="grid grid-rows-4">
            <div className="col-start-2">
                <h1>Discard pile</h1>
                <Card card={discard} direction="across" />
            </div>
            <div className="col-start-3">
                <h1>Pickup Pile</h1>
                <Card card={discard} direction="across" isBack={true} />
            </div>
        </div>
    )
}

export default Board
