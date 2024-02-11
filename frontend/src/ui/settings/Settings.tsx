import { useState } from "react";
import Container from "../components/Container";

const Settings = () => {
    const [fontSize, setFontSize] = useState(16);
    const handleIncreaseFont = () => {
        setFontSize(fontSize + 1);
    }
    return (
        <Container>
            <h1>Settings</h1>
            <button onClick={handleIncreaseFont}>Increase Fontsize</button>
        </Container>
    );
};

export default Settings;
