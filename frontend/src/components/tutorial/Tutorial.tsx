import Container from '../ui/Container'

const Tutorial = () => {
    return (
        <Container>
            <div className="justify-center">
                <div className="border-b border-solid border-blueGray-200 rounded-t">
                    <h2 className="text-xl font-bold">Game Goal</h2>
                </div>
                <h3 className="text-base">
                    Get rid of all cards in hand by creating melds of cards of
                    the same rank or increasing in rank with the same suit. The
                    yellow star means it is your turn
                </h3>
                <div className="border-b border-solid border-blueGray-200 rounded-t">
                    <h2 className="text-xl font-bold">Play Round</h2>
                </div>
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

                <div className="border-b border-solid border-blueGray-200 rounded-t">
                    <h2 className="text-xl font-bold">Voice Commands</h2>
                </div>
                <h3 className="text-base">
                    1. <b>Starting your turn:</b> <span className="italic">"Pickup"</span> to pickup from the pickup pile or <span className="italic">"Discard"</span> to pickup from the disacrd Pile
                </h3>
                <h3 className="text-base">
                    2. <b>Creating a meld:</b> <span className="italic">"Select 1, 2, 3"</span> to select cards from your hand and then "Meld" to create Meld
                    <br />
                    3. <b>Laying off:</b> <span className="italic">"Select 1"</span> to select card 1 and then <span className="italic">"Layoff 1"</span> to add to Layoff 1
                    <br />
                    4. <b>Ending your turn:</b> <span className="italic">"Select 1"</span> to select card 1 and then <span className='italic'>"Discard"</span> to discard card from your hand and end your turn
                </h3>
            </div>
        </Container>
    )
}

export default Tutorial
