import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    link?: string;
}
const Button = (props: ButtonProps) => {
    const classNames = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded block";
    if (props.link) {
        return (<Link to={props.link} className={classNames}>{props.text}</Link>)
    }
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={props.onClick}>
            {props.text}
        </button>
    )
};
export default Button;
