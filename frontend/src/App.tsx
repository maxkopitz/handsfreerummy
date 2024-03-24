import MainMenu from './components/MainMenu'
import About from './components/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProfileProvider } from './hooks/Profile'
import { GameProvider } from './hooks/Game'
import { ModalProvider } from './hooks/Modal'
import { useEffect } from 'react'
import { socket } from './api/socket'
import Game from './components/game/Game'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainMenu />,
    },
    {
        path: 'games/:gameId',
        element: <Game />,
    },
    {
        path: 'about',
        element: <About />,
    },
])
const App = () => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected')
        });
        socket.on('disconnect', () => {
            console.log('Disconnect')
        });
    }, []);
    return (
        <div className="h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <ProfileProvider>
                <GameProvider>
                    <ModalProvider>
                        <RouterProvider router={router} />
                    </ModalProvider>
                </GameProvider>
            </ProfileProvider>
        </div>
    )
}

export default App
