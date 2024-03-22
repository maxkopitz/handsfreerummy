import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import { RummyGame } from "../../Type";
import Button from "../ui/Button";
import Container from "../ui/Container";


interface LobbyProps {
    game: RummyGame;
}
const Lobby = ({ game }: LobbyProps) => {
    const navigate = useNavigate();
    const handleLeaveGame = () => {
        axiosInstance
            .post<any>('/games/' + game.gameId + '/', {
                data: {
                    action: 'leave',
                },
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
            .then((res: any) => {
                navigate('/')
            })
    }
    return (
        <Container>
            <div>
                <h1>I am a lobby { game.gameId } </h1>

                <Button text={"Leave Game"} onClick={handleLeaveGame} />
            </div>
        </Container>)
}

export default Lobby;
