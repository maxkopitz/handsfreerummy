import { Link } from "react-router-dom";
const Button = (props: any) => {
    const classNames = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded block";
    if (props.link) {
        return (<Link to={props.link} className={classNames}>{props.text}</Link>)
    }
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {props.text}
        </button>
    )
};
export default Button;
