import Container from './ui/Container'
import Button from './ui/Button'

const About = () => {
    return (
        <Container>
            <div className="justify-center">
                <h1 className="font-bold text-4xl mb-3">About</h1>
                <p className="mb-3">
                    Hands Free Rummy is a Voice Activated Card Game for Rummy
                    making it easy for anyone with low mobility or people living
                    in different places to play card games with loved ones.
                </p>
                <h2 className="font-bold text-2xl mb-3">Mission</h2>
                <p className="mb-3">
                    Have you ever had trouble reading playing cards? Or do you
                    want to play cards with someone who has limited motor and
                    visual function? In order to promote cognitive stimulation
                    and socialization for those with declined motor function or
                    visual disabilities, Hands-Free Rummy will allow users to
                    play the card game Rummy while spending time with their
                    loved ones. Hands-Free Rummy is a website with a
                    customizable user interface (UI) where users play Rummy
                    entirely through vocal cues without touching the screen,
                    ensuring they can still enjoy playing card games despite
                    their disability.
                </p>

                <h2 className="font-bold text-2xl mb-3">Rules</h2>
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
                    Start a game or join a game to play with up to four players!
                </p>
            </div>

            <div>
                <Button text={'Back to Main Menu'} link={'/'} />
            </div>
        </Container>
    )
}

export default About
