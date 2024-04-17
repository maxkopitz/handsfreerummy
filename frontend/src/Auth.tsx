import { useEffect } from "react";
import { toast } from "react-hot-toast";
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
        }).catch(() => {
            toast.error('An error occured, please refresh.')
        });
    }, [navigate])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket Connected')
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
