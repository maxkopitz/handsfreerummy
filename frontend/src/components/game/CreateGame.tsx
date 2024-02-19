import axiosInstance from "../../api/axiosConfig";
import { useModal } from "../../hooks/Modal";
import Button from "../ui/Button";
import Container from "../ui/Container";

const CreateGame = () => {
    const { dispatch } = useModal();
    const handleCreateGame = async () => {
        await axiosInstance.post('/games').then((res) => {
            // TODO: add game to context
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
