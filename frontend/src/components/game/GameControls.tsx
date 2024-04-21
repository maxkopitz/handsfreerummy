import { useNavigate } from "react-router-dom"
import axiosInstance from "../../api/axiosConfig"
import { useModal } from "../../hooks/Modal"
import { RummyGame } from "../../Type"
import Button from "../ui/Button"
import { toast } from 'react-hot-toast'
import Settings from "../settings/Settings"
import Tutorial from "../tutorial/Tutorial"

interface GameControlsProp {
    game: RummyGame
}

const GameControls = ({ game }: GameControlsProp) => {
    const { dispatch: dispatchModal } = useModal()
    const navigate = useNavigate()
    const handleLeaveGame = () => {
        const data = JSON.stringify({
            action: 'leave',
        })
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', data)
            .then(() => {
                navigate('/')
            })
            .catch(() => {
                toast('Unable to leave!')
            })
    }
    return (
        <>
            <div>
                <Button
                    text={'Settings'}
                    onClick={() =>
                        dispatchModal({
                            type: 'showModal',
                            modal: {
                                title: 'Settings',
                                component: <Settings />,
                                isSaveButton: true,
                            },
                        })
                    }
                />
            </div>
            <div>
                <Button
                    text={'Tutorial'}
                    onClick={() =>
                        dispatchModal({
                            type: 'showModal',
                            modal: {
                                title: 'Tutorial',
                                component: <Tutorial />,
                            },
                        })
                    }
                />
                <Button text={game.isOwner ? 'End Game' : 'Leave Game'} onClick={handleLeaveGame} />
            </div>
        </>
    )

}

export default GameControls;
