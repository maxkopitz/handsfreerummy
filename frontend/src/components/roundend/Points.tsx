import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'
import { TupleType } from 'typescript'
import { useModal } from '../../hooks/Modal'
import { PointList } from '../../Type'

interface PointsProps {
    points: PointList[]

}

const Points = (points :PointsProps) => {
    
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
                        {points.points.map((round : PointList, index: number) => {
                            const isLast = index === points.points.length - 1
                            const classes = isLast
                                ? 'p-4'
                                : 'p-4 border-b border-30 border-black'
                            return (
                                <div key={index}>{ round.points[0] }</div>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Points
