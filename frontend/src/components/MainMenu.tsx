import { socket } from '../socket'
import JoinGame from './joingame/JoinGame'
import Button from './ui/Button'
import Container from './ui/Container'
import { useEffect } from 'react'
import { API_URL } from '../config'
import axios from 'axios'

const MainMenu = () => {
    const handleCreateGame = () => {
        console.log('test')
        socket.emit('create-game')
    }

    useEffect(() => {
        socket.on('connect', () => {})
        axios.get(API_URL + '/').then((res) => {
            console.log(res.data)
        });
    }, [])

    return (
        <Container>
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
                    <Button text={'Settings'} link={'settings'} />
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
