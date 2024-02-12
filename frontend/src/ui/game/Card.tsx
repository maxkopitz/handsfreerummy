import { CardType, Suit } from "../../Type";
import { useProfile } from "../../providers/Profile";

//Pick Card Design
interface CardProps {
  card: CardType;
}

const Card = ({ card }: CardProps) => {
  const { profile } = useProfile();
  const style = {
    width: "100px",
    height: "150px",
    border: "2px solid black",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    color: profile.color,
  };

  console.log(profile.color);
  // ['♠', '♣', '♥', '♦']
  let suitSymbol = "";
  if (card.suit === Suit.S) {
    suitSymbol = "♠";
  } else if (card.suit === Suit.C) {
    suitSymbol = "♣";
  } else if (card.suit === Suit.H) {
    suitSymbol = "♥";
  } else if (card.suit === Suit.D) {
    suitSymbol = "♦";
  }
  return (
    <>
      <div style={style}>
        {card.value} {suitSymbol}
      </div>
    </>
  );
};

export default Card;
