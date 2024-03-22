import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import { useModal } from "../../hooks/Modal";
import Button from "../ui/Button";
import Container from "../ui/Container";

const CreateGame = () => {
    const { dispatch } = useModal();
    const navigate = useNavigate();
    const handleCreateGame = async () => {
        await axiosInstance.post('/games').then((res) => {
            const { data } = res;
            const gameId = data.game.gameId;
            navigate('/games/' + gameId);

            dispatch({ type: 'closeModal' })
        })
    }
    return (
        <Container>
            <Button text='Create Game' onClick={handleCreateGame} />
        </Container>
    )
}
export default CreateGame;
