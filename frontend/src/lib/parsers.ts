import { CardType } from "../Type";

export const parseHand = (hand: CardType[]) => {
    const parsedHand: CardType[] = [];
    hand.forEach((card: CardType) => {
        parsedHand.push({ ...card, isSelected: false })
    });
    return parsedHand;
}

export const selectedCards = (hand: CardType[]) => {
    const parsedHand: CardType[] = hand.filter((card) => card.isSelected)
    return parsedHand;

}
