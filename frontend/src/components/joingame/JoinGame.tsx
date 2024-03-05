import { useEffect, useState } from 'react'
import { LobbyGame } from '../../Type';
import Game from './Game'

const tableHeaders = ["Players", ""];

const initalGames: LobbyGame[] = [
    {
        id: "1",
        players: 0,
        state: "lobby"
    }
]
const JoinGame = () => {
    const [games, setGames] = useState<LobbyGame[]>([]);
    useEffect(() => {
        /* TODO: Socket to listen for new games*/
        setGames(initalGames);
    }, []);

    return (
        <div className="flex flex-col w-1/2 justify-center items-center">
            <h2>Join Game</h2>
            <table className="table-auto w-full w-min-max text-left border-4 rounded-sm">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {games.length === 0 && (
                        <tr>
                            <td className="p-4">No games available</td>
                        </tr>
                    )}
                    {games.map((item, index) => {
                        const isLast = index === games.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return (
                            <Game key={item.id} game={item} className={classes} />)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default JoinGame
