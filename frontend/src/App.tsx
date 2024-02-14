import MainMenu from './components/MainMenu'
import Table from './components/game/Table'
import Settings from './components/settings/Settings'
import About from './components/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProfileProvider } from './hooks/Profile'
import { GameProvider } from './hooks/Game'

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
        path: 'settings',
        element: <Settings />,
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
                <RouterProvider router={router} />
            </GameProvider>
        </ProfileProvider>
    )
}

export default App
