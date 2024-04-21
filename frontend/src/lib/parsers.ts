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

export const parseVerbalNumberToNumber = (card_number: string): number => {
    // Azure adds periods and upper cases
    card_number = card_number.replaceAll(".","").toLowerCase()
    switch (card_number) {
        case '1':
        case 'one':
        case 'won':
            return 1
        case '2':
        case 'two':
        case 'to':
        case 'too':
            return 2
        case '3':
        case 'three':
        case 'tree':
            return 3
        case '4':
        case 'for':
        case 'four':
            return 4
        case '5':
        case 'five':
            return 5
        case '6':
        case 'six':
            return 6
        case '7':
        case 'seven':
            return 7
        case '8':
        case 'eight':
            return 8
        case '9':
        case 'nine':
            return 9
        case '10':
        case 'ten':
            return 10
        case '11':
        case 'eleven':
            return 11
        case '12':
        case 'twelve':
            return 12
        case '13':
        case 'thirteen':
            return 13
        case '14':
        case 'fourteen':
            return 14
        default:
            return -1
    }
}
