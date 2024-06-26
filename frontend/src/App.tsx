import MainMenu from './components/MainMenu'
import About from './components/About'
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useNavigate,
} from 'react-router-dom'
import { ProfileProvider } from './hooks/Profile'
import { GameProvider } from './hooks/Game'
import { ModalProvider } from './hooks/Modal'
import { useEffect, useState } from 'react'
import { socket } from './api/socket'
import Game from './components/game/Game'
import axiosInstance from './api/axiosConfig'
import Modal from './components/ui/Modal'
import { toast, Toaster } from 'react-hot-toast'
import { AxiosError } from 'axios'

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
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

const Layout = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    useEffect(() => {
        const fetch = async () => {
            await axiosInstance.get(`register`).then((res) => {
                if (res.data?.redirect) {
                    navigate(res.data.redirect)
                }
                setIsLoading(false)
            }).catch(() => {
                toast.error('An error occured registering.')
                setIsLoading(true)
            })
        }
        fetch()
        return () => {
            setIsLoading(true)
        }
    }, [navigate])

    useEffect(() => {
        if (!isLoading) {
            if (!isConnected) {
                socket.connect()
                socket.on('connect', () => {
                    setIsConnected(true)
                })
                socket.on('disconnect', () => {
                    setIsConnected(false)
                })

            }
        }
        return () => {
        }
    }, [isLoading, isConnected])

    useEffect(() => {
        document.body.style.backgroundColor = "#d1d5db";

        return () => {
            document.body.style.backgroundColor = "#d1d5db";
        };
    }, []);


    return (
        <div className="h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <ProfileProvider>
                <GameProvider>
                    <ModalProvider>
                        <Modal />
                        <Toaster
                            position='top-right'
                        />
                        {isConnected && !isLoading && <Outlet />}
                    </ModalProvider>
                </GameProvider>
            </ProfileProvider>
        </div>
    )
}
export default App
