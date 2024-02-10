import Container from "../components/Container";
import Board from "./Board";
import Hand from "./Hand";

const Table = () => {
  return (
    <Container>
      <Hand />
      <Hand />
      <Hand />
      <Hand />
      <Board />
    </Container>
  );
};

export default Table;
