import { CardType } from "../../Type";
import Card from "./Card";
import CardBack from "./CardBack";

//Implement Game Logic and Design Tutorial and Implement Game Layout
interface BoardProps {
  discard: CardType;
  playedRuns: CardType[][]; // 2d array where playedRuns[0] = array of Cards in the order of the run
}
const Board = ({ discard, playedRuns }: BoardProps) => {
  return (
    <div className="grid grid">
      <div>
        <h1>Discard pile</h1>
        <Card card={discard} />
      </div>

      <div>
        <h1>Pickup Pile</h1>
        <CardBack />
      </div>

      <div>
        <h1>Played Cards</h1>
        {playedRuns.map((run, i) =>
          run.map((card, j) => <Card key={`${i}-${j}`} card={card} />)
        )}
      </div>
    </div>
  );
};

export default Board;
