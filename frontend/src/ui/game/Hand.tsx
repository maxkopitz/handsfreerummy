import { Suit, Value } from "../../Type";
import Card from "./Card";
import { CardType } from "../../Type";

// import CardBack from "./CardBack";

interface HandProps {
  playerId: number;
  isPlayer: boolean;
  hand: CardType[];
}

const Hand = ({ playerId, isPlayer, hand }: HandProps) => {
  return (
    <div>
      <h1>Hand {playerId} </h1>
      <Card card={{ value: Value.A, suit: Suit.C }} />
    </div>
  );
};

export default Hand;
