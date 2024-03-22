export enum Suit {
    C = 'clubs',
    D = 'diamonds',
    H = 'hearts',
    S = 'spades',
}

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
    J = 'J',
    Q = 'Q',
    K = 'K',
}

// export enum Color {
//   black = "Black",
//   blue = "Blue",
//   red = "Red",
// }

export interface CardType {
    suit: Suit
    value: Value | number
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
