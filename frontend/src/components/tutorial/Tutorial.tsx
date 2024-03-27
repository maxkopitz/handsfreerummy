import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'

const Tutorial = () => {
    return (
        <Container>
            <div className="justify-center">
                <h2 className="text-xl">Game Goal</h2>
                <h3 className = "text-base">Get rid of all cards in hand by creating melds of cards of the same rank or 
                increasing in rank with the same suit.</h3>
                <h2 className="text-xl">Play Round</h2>
                <h3 className="text-base">
                    1. Pick up a card from pickup pile or discard pile.
                </h3>
                <h3 className="text-base">
                    2. Play cards from your hand into a meld on board or create
                    your own meld. Melds are sequences of the same suit in
                    ascending order or cards of the same rank but different
                    suit.
                </h3>
                <h3 className="text-base">
                    3. Discard a card into the discard pile. Note: cannot
                    discard card picked up from discard pile on the same turn!
                </h3>
                <h2 className="text-xl">Commands</h2>
                <h3 className="text-base">
                    1. "Pickup from Discard Pile" or "Pickup from Pickup Pile"
                </h3>
                <h3 className="text-base">
                    2. "Play 9 of hearts on meld 5", "Create meld with 9 of
                    hearts, 9 or spades, and 9 of clubs", or "Discard 10 of
                    hearts"
                </h3>
            </div>
        </Container>
    )
}

export default Tutorial
