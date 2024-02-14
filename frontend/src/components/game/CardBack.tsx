import classNames from 'classnames'

const CardBack = () => {
    let classes = classNames(
        'w-24 h-32 border-2 rounded-md text-3xl text-center',
        'text-black-500 border-black-950'
    )

    return <div className={classes}> </div>
}

export default CardBack
