import Container from './ui/Container'

const About = () => {
    return (
        <Container>
            <h1>About</h1>
            <h1>
                Hands Free Rummy is a Voice Activated Card Game for Gin Rummy
                making it easy for anyone with low mobility or low vision to
                play games with loved ones.
            </h1>
            <p>
                Rules are taken from{' '}
                <a
                    href="https://bicyclecards.com/how-to-play/rummy-rum"
                    style={{ textDecoration: 'underline', color: 'blue' }}
                >
                    bicycle rules
                </a>
                .
            </p>
            <p>create a game or join a game to play with up to four players!</p>
        </Container>
    )
}

export default About
