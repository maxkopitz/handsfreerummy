import { CardType } from '../../Type'
import Card from './Card'

//Implement Game Logic and Design Tutorial and Implement Game Layout
interface BoardProps {
    discard: CardType
    playedRuns: CardType[][] // 2d array where playedRuns[0] = array of Cards in the order of the run
}
const Board = ({ discard, playedRuns }: BoardProps) => {
    return (
        <div className="col-span-5 flex flex-row items-center justify-center width-screen">
            <div className="col-start-3 flex flex-col items-center justify-center p-10">
                <h1>Discard</h1>
                <Card card={discard} />
            </div>
            <div className="col-start-4 flex flex-col items-center justify-center p-10">
                <h1>Pickup</h1>
                <Card card={discard} isBack={true} isPickup={true} />
            </div>
        </div>
    )
}

export default Board
