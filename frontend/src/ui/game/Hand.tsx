import { Suit, Value } from "../../Type";
import Card from "./Card";
import { CardType } from "../../Type";
import classNames from "classnames";

// import CardBack from "./CardBack";

interface HandProps {
  playerId?: number;
  isPlayer: boolean;
  direction: string;
  hand: CardType[];
}

const Hand = ({ playerId, isPlayer, direction, hand }: HandProps) => {
  const classes = classNames(
    "flex",
    { "flex-row": isPlayer || direction === "across" },
    { "flex-col": !isPlayer && direction === "next-to" }
  );

  return (
    <div className={classes}>
      <h1>Hand {playerId} </h1>
      <Card
        card={{ value: Value.A, suit: Suit.C }}
        direction={direction}
        isBack={!isPlayer}
      />
      <Card
        card={{ value: Value.A, suit: Suit.C }}
        direction={direction}
        isBack={!isPlayer}
      />
      <Card
        card={{ value: Value.A, suit: Suit.C }}
        direction={direction}
        isBack={!isPlayer}
      />
      <Card
        card={{ value: Value.A, suit: Suit.C }}
        direction={direction}
        isBack={!isPlayer}
      />
    </div>
  );
};

export default Hand;
