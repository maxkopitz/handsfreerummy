import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";
import { socket } from "./api/socket";

const Auth = ({ children }: any) => {
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`register`).then((res) => {
            const { data } = res;
            if (data?.redirect) {
                navigate(data?.redirect);
            }
            console.log(data)
        });
    }, [navigate])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected')
        });
        socket.on('disconnect', () => {
            console.log('Disconnect')
        });
    }, []);
    return (
        <>
            {children}
        </>
    )
}

export default Auth;
