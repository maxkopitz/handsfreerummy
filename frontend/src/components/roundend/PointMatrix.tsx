import { useModal } from "../../hooks/Modal";
import { useNavigate } from 'react-router-dom'
import { LobbyGame } from '../../Type'
import Button from '../ui/Button'

interface PointRowProps {
    player: number
    pointNumber: number
    numPlayers: number
    sum: Array<number>
}

const Row = ({ player, pointNumber, numPlayers, sum }: PointRowProps) => {
    var pointsArray = []
    if (numPlayers < 3){
        pointsArray = [ 0, 0 ]
    }else if (numPlayers < 4){
        pointsArray = [ 0, 0, 0 ]
    }else {
        pointsArray = [ 0, 0, 0, 0 ]
    }
    pointsArray[player - 1] = pointNumber
    if (player < 1){
        return (
            <tr className= "border-b border-30 border-white items-center justify-right text-blue-700">
            {
                sum.map((element, index) => (
                    <th key={index}>{ element }</th>
                ))
            }
            
        </tr>
        )
    }else {
        
    return (
        <tr className= "border-b border-30 border-black items-center justify-center">
            {
                pointsArray.map((element, index) => (
                    <th key={index}>{ element }</th>
                ))
            }
            
        </tr>
    )
}}
export default Row
