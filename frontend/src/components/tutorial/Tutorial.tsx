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
                <h3 className="text-base">
                    Get rid of all cards in hand by creating melds of cards of
                    the same rank or increasing in rank with the same suit. The
                    yellow star means it is your turn
                </h3>
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
                    1. "Pickup" to pickup from the pickup pile or "Discard" to pickup from the disacrd Pile
                </h3>
                <h3 className="text-base">
                    2. "Select 1, 2, 3" to select cards from your hand and then "Meld" to create Meld
                    <br></br>
                    "Select 1" to select card and then "Layoff 1" to add to a Layoff 
                    3. "Discard 1" to discard card from your hand and end your turn
                    
                </h3>
            </div>
        </Container>
    )
}

export default Tutorial
