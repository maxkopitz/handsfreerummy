import Container from './ui/Container'
import Button from './ui/Button'

const About = () => {
    return (
        <Container>
            <div className="justify-center">
                <h1>About</h1>
                <h1>
                    Hands Free Rummy is a Voice Activated Card Game for Rummy
                    making it easy for anyone with low mobility or people living
                    in different places to play card games with loved ones.
                </h1>
                <p>
                    Rules are taken from{' '}
                    <a
                        href="https://bicyclecards.com/how-to-play/rummy-rum"
                        style={{ textDecoration: 'underline', color: 'blue' }}
                    >
                        Bicycle Rules
                    </a>
                    .
                </p>
                <p>
                    Start a game or join a game to play with up to Six players!
                </p>
            </div>

            <div>
                <Button text={'Back to Main Menu'} link={'/'} />
            </div>
        </Container>
    )
}

export default About
