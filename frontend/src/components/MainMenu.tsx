import { socket } from '../api/socket'
import JoinGame from './joingame/JoinGame'
import Button from './ui/Button'
import Container from './ui/Container'
import { useEffect } from 'react'
import { API_URL } from '../config'
import { useModal } from '../hooks/Modal'
import Settings from './settings/Settings'
import Modal from './ui/Modal'
import axiosInstance from '../api/axiosConfig'

const MainMenu = () => {
    const { dispatch } = useModal();
    const handleCreateGame = () => {
        socket.emit('create-game')
    }
    useEffect(() => {
        axiosInstance.get(`${API_URL}/register`).then((res) => {
            console.log(res.data)
        })
    }, [])
    return (
        <Container>
            <Modal />
            <div className="flex flex-col justify-center items-center">
                <div className="mb-20">
                    <h1 className="text-slate-500 text-5xl font-bold">
                        Handsfree Rummy
                    </h1>
                </div>
                <JoinGame />
                <div>
                    <Button text={'Create Game'} onClick={handleCreateGame} />
                </div>
                <div>
                    <Button text={'Settings'} onClick={() => dispatch(
                        {
                            type: 'showModal', modal:
                                { title: "Settings", component: <Settings /> }
                        })} />
                </div>
                <div>
                    <Button text={'About'} link={'about'} />
                </div>
                <div>
                    <Button text={'Demo Board'} link={'game'} />
                </div>
            </div>
        </Container>
    )
}
export default MainMenu
