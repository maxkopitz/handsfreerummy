import Board from "./Board";
import Card from "./Card";
import Hand from "./Hand";

const Table = () => {
  return (
    <div>
      {" "}
      <Hand />
      <Hand />
      <Hand />
      <Hand />
      <Board />
    </div>
  );
};

export default Table;
