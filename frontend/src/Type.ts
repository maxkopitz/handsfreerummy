export enum Suit {
    C = 'clubs',
    D = 'diamonds',
    S = 'spades',
    H = 'hearts',
}

export const SuitOrder = Object.values(Suit)

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

export const ValueOrder = Object.values(Value)

// export enum Color {
//   black = "Black",
//   blue = "Blue",
//   red = "Red",
// }

export interface CardType {
    suit: Suit
    value: Value
    isSelected: boolean
}

export interface LobbyGame {
    id: string
    players: number
    state: string
}

export interface RummyPlayer {
    displayName: string
    playerOrder: number
    cardCount: number
}

export interface PointList {
    player: number
    points: number
}

export enum GameTurn {
    PICKUP = 'pickup',
    MELD = 'meld',
    DISCARD = 'discard',
}

export interface Meld {
    meldId: number
    cards: CardType[]
}

export interface TurnState {
    turnCounter: number
    stage: 'start' | 'end'
}
export interface RummyGame {
    gameId: string
    players: RummyPlayer[]
    gameState: string
    hand: CardType[]
    sortState: boolean
    discard: CardType
    melds: Meld[]
    playerOrder: number
    isOwner: boolean
    turnState: TurnState,
    points: PointList[]
}
