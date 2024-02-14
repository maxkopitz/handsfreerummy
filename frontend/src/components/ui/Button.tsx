import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface ButtonProps {
    text: string
    onClick?: any
    link?: string
    isActive?: boolean
}
const Button = (props: ButtonProps) => {
    const classes = classNames(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded block',
        { 'bg-green-700': props.isActive }
    )
    if (props.link) {
        return (
            <Link to={props.link} className={classes}>
                {props.text}
            </Link>
        )
    }
    return (
        <button className={classes} onClick={props.onClick}>
            {props.text}
        </button>
    )
}
export default Button
