import MainMenu from './components/MainMenu'
import Table from './components/game/Table'
import About from './components/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProfileProvider } from './hooks/Profile'
import { GameProvider } from './hooks/Game'
import { ModalProvider } from './hooks/Modal'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainMenu />,
    },
    {
        path: 'game',
        element: <Table />,
    },
    {
        path: 'about',
        element: <About />,
    },
])
const App = () => {
    return (
        <ProfileProvider>
            <GameProvider>
                <ModalProvider >
                    <RouterProvider router={router} />
                </ModalProvider>
            </GameProvider>
        </ProfileProvider>
    )
}

export default App
