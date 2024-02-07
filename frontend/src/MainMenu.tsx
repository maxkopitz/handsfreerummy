import Button from "./ui/components/Button";
import Container from "./ui/components/Container";

const MainMenu = () => {
    return (
    <Container>
        <h1 className="text-slate-500">Handsfree Rummy</h1>
        <Button text={"Join Game"} link={"game"}/>
        <Button text={"Create Game"} link={"game"}/>
        <Button text={"Settings"} link={"settings"}/>
        <Button text={"About"} link={"about"}/>

    </Container>
    );
};
export default MainMenu;
