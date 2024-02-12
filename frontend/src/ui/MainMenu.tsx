import { SocketEvents, socket } from "../socket";
import JoinGame from "./joingame/JoinGame";
import Button from "./components/Button";
import Container from "./components/Container";
import { useEffect, useState } from "react";
import { LobbyGame } from "../Type";

const MainMenu = () => {
  const [games, setGames] = useState<LobbyGame[]>([]);
  const handleCreateGame = () => {
    console.log("test");
    socket.emit("create-game");
  };

  useEffect(() => {
    const onNewGame = (data: any) => {
      console.log("new game", data);
      setGames([...games, data]);
    };
    socket.on("connect", () => {
      console.log(socket.connected); // true
      console.log(socket.id);
    });
    socket.on(SocketEvents.NEW_GAMES, onNewGame);
  }, []);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-20">
          <h1 className="text-slate-500 text-5xl font-bold">Handsfree Rummy</h1>
        </div>
        <JoinGame games={games} />
        <div>
          <Button text={"Create Game"} onClick={handleCreateGame} />
        </div>
        <div>
          <Button text={"Settings"} link={"settings"} />
        </div>
        <div>
          <Button text={"About"} link={"about"} />
        </div>
      </div>
    </Container>
  );
};
export default MainMenu;
