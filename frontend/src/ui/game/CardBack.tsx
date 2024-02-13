import classNames from 'classnames'

const CardBack = () => {
    const style = {
        background: 'light blue',
        width: '100px',
        height: '150px',
        border: '2px solid black',
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
    }

    let classes = classNames(
        'w-24 h-32 border-2 rounded-md text-3xl text-center',
        'text-black-500 border-black-950'
    )

    return <div className={classes}> </div>
}

export default CardBack
