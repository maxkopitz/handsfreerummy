import { useModal } from "../../hooks/Modal";
import { useNavigate } from 'react-router-dom'
import { LobbyGame } from '../../Type'
import Button from '../ui/Button'

interface PointRowProps {
    player: string
    pointNumber: number
}

const Row = ({ player, pointNumber }: PointRowProps) => {
    return (
        <tr className= "border-b border-30 border-black items-center justify-center">
            <td >{player}</td>
            <td >{pointNumber}</td>
            
        </tr>
    )
}
export default Row
