import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'
import { TupleType } from 'typescript'
import { useModal } from '../../hooks/Modal'
import { PointList } from '../../Type'
import Row from './PointMatrix'
import Game from '../joingame/Game'

interface PointsProps {
    points: PointList[]
    numPlayers: number

}

const Points = ({points, numPlayers} :PointsProps) => {
    console.log(points)
    var tableHeaders = []
    var totals = [0]
    if(numPlayers < 3){
        tableHeaders = ['Player 1', 'Player 2']
        totals = [0, 0]

    }else if(numPlayers < 4){
        tableHeaders = ['Player 1', 'Player 2', 'Player 3']
        totals = [0, 0, 0]
    }else {
        tableHeaders = ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        totals = [0, 0, 0, 0]
    }
    points.forEach((round:PointList) => totals[round.player - 1] = totals[round.player - 1] + round.points)
    
    return (
        <Container>

            <div className="flex flex-col justify-center items-center">
                <table className="table-auto w-full w-min-max text-center border-30 rounded-sm justify-center items-center">
                    <thead>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th
                                    className="border-b border-black bg-blue-gray-50 p-4 justify-center items-center"
                                    key={index}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {points.map((round: PointList, index) => {
                            console.log(round.points)
                            const isLast = index === points.length - 1
                            const classes = isLast
                                ? 'p-4'
                                : 'p-4 border-b border-30 border-black'
                            return (
                                <Row 
                                    key={index}
                                    player={round.player}
                                    pointNumber={round.points}
                                    numPlayers={numPlayers}
                                    sum={[0]}
                                />
                            )
                        })}
                        <Row
                            player={0}
                            pointNumber={0}
                            numPlayers={numPlayers}
                            sum={totals}
                        />
                        
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Points
