import MainMenu from './components/MainMenu'
import About from './components/About'
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom'
import { ProfileProvider } from './hooks/Profile'
import { GameProvider } from './hooks/Game'
import { ModalProvider } from './hooks/Modal'
import { useEffect } from 'react'
import { socket } from './api/socket'
import Game from './components/game/Game'
import axiosInstance from './api/axiosConfig'
import Modal from './components/ui/Modal'


const App = () => {

    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
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
                }]
        }
    ])
    return (
        <RouterProvider router={router} />
    )
}

const Layout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        axiosInstance.get(`register`).then((res) => {
            if (res.data?.redirect) {
            navigate(res.data.redirect);
            }
        });
    }, [navigate])
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
                        <Modal />
                        <Outlet />
                    </ModalProvider>
                </GameProvider>
            </ProfileProvider>
        </div>
    )
}
export default App
