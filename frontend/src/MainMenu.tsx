import { socket } from "./socket";
import Button from "./ui/components/Button";
import Container from "./ui/components/Container";

const MainMenu = () => {
    const handleCreateGame = () => {
        console.log('test');
        //socket.emit("create-game");
    }
    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <div className="mb-20">
                    <h1 className="text-slate-500 text-5xl font-bold">Handsfree Rummy</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2>Join Game</h2>
                    <div className="w-full min-h-48 min-w-96 border-4 rounded-sm border-green-500">
                    </div>
                </div>
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
