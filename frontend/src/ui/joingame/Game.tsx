import { LobbyGame } from "../../Type";
import Button from "../components/Button";

interface GameProps {
  game: LobbyGame;
}

const Game = ({ game }: GameProps) => {
  return (
    <tr>
      <td className="border boarder-slate-700">0/4</td>
      <td className="border boarder-slate-700">
        <Button text={"join"} link="game" />
      </td>
    </tr>
  );
};
export default Game;
