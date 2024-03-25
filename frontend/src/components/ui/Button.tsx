import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface ButtonProps {
    text: string
    onClick?: any
    link?: string
    isActive?: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
}

const Button = ({ text, onClick, link, isActive = false, size, disabled = false }: ButtonProps) => {
    const classes = classNames(
        'text-white text-2xl font-bold py-3 px-8 m-1 rounded shadow-md hover:shadow-lg outline-none inline-block',
        { 'bg-green-500 hover:bg-green-700': isActive && !disabled },
        { 'bg-blue-500 hover:bg-blue-700': !isActive && !disabled },
        { 'bg-gray-500': disabled },
    )

    if (link) {
        return (
            <Link to={link} className={classes}>
                {text}
            </Link>
        )
    }
    return (
        <button className={classes} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}
export default Button
