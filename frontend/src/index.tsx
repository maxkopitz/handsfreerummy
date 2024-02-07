import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainMenu from "./MainMenu";
import Table from "./ui/game/Table";
import Settings from "./ui/settings/Settings";
import About from "./ui/About";

import './index.css';
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainMenu />
    },
    {
        path: "game",
        element: <Table />,
    },
    {
        path: "settings",
        element: <Settings />,
    },
    {
        path: "about",
        element: <About />,
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
);
