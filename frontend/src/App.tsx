import MainMenu from './components/MainMenu'
import Table from './components/game/Table'
import Settings from './components/settings/Settings'
import About from './components/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProfileProvider } from './hooks/Profile'

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
    // const [profile, dispatch] = useReducer(reducer, initialState);
    return (
        <ProfileProvider>
            <RouterProvider router={router} />
        </ProfileProvider>
    )
}

export default App
