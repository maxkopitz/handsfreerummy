import { CardType } from '../Type'

export const parseCard = (card: CardType) => {
    return { ...card, isSelected: false }
}
export const parseHand = (hand: CardType[]) => {
    const parsedHand: CardType[] = []
    hand.forEach((card: CardType) => {
        parsedHand.push(parseCard(card))
    })
    return parsedHand
}

export const selectedCards = (hand: CardType[]) => {
    const parsedHand: CardType[] = hand.filter((card) => card.isSelected)
    return parsedHand
}

export const reduceCard = (card: any) => {
    return Object.keys(card)
        .filter((objKey) => objKey !== 'isSelected')
        .reduce((newObj: any, key: any) => {
            newObj[key] = card[key]
            return newObj
        }, {})
}
