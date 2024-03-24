export enum Suit {
    C = 'clubs',
    D = 'diamonds',
    S = 'spades',
    H = 'hearts',
}

export const SuitOrder = Object.values(Suit);

export enum Value {
    A = 'A',
    Two = '2',
    Three = '3',
    Four = '4',
    Five = '5',
    Six = '6',
    Seven = '7',
    Eight = '8',
    Nine = '9',
    Ten = '10',
    J = 'J',
    Q = 'Q',
    K = 'K',
}

export const ValueOrder = Object.values(Value);

// export enum Color {
//   black = "Black",
//   blue = "Blue",
//   red = "Red",
// }

export interface CardType {
    suit: Suit
    value: Value
    // rank: Rank
}

export interface LobbyGame {
    id: string
    players: number
    state: string
}

export interface RummyGame {
    gameId: string
    players: string[]
    gameState: string
    playerCards: CardType[]
}
