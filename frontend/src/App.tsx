import React, { useReducer } from "react";
import MainMenu from "./ui/MainMenu";
import Table from "./ui/game/Table";
import Settings from "./ui/settings/Settings";
import About from "./ui/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProfileProvider } from "./providers/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
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
const App = () => {
  // const [profile, dispatch] = useReducer(reducer, initialState);
  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  );
};

export default App;
