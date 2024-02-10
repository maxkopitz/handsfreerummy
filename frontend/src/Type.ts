export enum Suit {
  C = "clubs",
  D = "diamonds",
  H = "hearts",
  S = "spades",
}

export enum Value {
  A = "ace",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  J = "Jack",
  Q = "Queen",
  K = "King",
}

export interface CardType {
  suit: Suit;
  value: Value;
}
