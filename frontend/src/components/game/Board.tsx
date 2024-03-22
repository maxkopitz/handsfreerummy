import { CardType } from '../../Type'
import Card from './Card'

//Implement Game Logic and Design Tutorial and Implement Game Layout
interface BoardProps {
    discard: CardType
    playedRuns: CardType[][] // 2d array where playedRuns[0] = array of Cards in the order of the run
}
const Board = ({ discard, playedRuns }: BoardProps) => {
    return (
        <div className="flex flex-row items-center justify-center width-screen">
            
        </div>
    )
}

export default Board
