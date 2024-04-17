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

}

const Points = ({points} :PointsProps) => {
    console.log(points)
    const tableHeaders = ['Player 1', 'Player 2']
    return (
        <Container>

            <div className="flex flex-col w-1/2 justify-center items-center">
                <table className="table-auto w-full w-min-max text-left border-30 rounded-sm justify-center items-center">
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
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Points
