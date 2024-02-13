import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Board from './Board'
import Hand from './Hand'
import { socket } from '../../socket'
import { Suit, Value } from '../../Type'

const Table = () => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    useEffect(() => {
        console.log('initilized')
        function onConnect() {
            console.log(socket.connected)
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        return () => {
            console.log('goodbye')
            socket.disconnect()
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [])

    const dummyRuns = [
        [
            { value: Value.A, suit: Suit.C },
            { value: Value.A, suit: Suit.D },
        ],
        [{ value: Value.K, suit: Suit.D }],
        [{ value: Value.J, suit: Suit.C }],
    ]
    return (
        <Container>
            <div className="grid grid-cols-5">
                <div className="row-span-3 row-start-2">
                    <Hand
                        isPlayer={false}
                        playerId={1}
                        direction={'next-to'}
                        hand={[]}
                    />
                </div>
                <div className="col-span-3 col-start-2">
                    <Hand
                        isPlayer={false}
                        playerId={2}
                        direction={'across'}
                        hand={[]}
                    />
                </div>
                <div className="col-span-3">
                    <Board
                        playedRuns={dummyRuns}
                        discard={{ value: Value.Six, suit: Suit.H }}
                    />
                </div>
                <div className="row-span-3">
                    <Hand
                        isPlayer={false}
                        playerId={3}
                        direction={'next-to'}
                        hand={[]}
                    />
                </div>
                <div className="col-span-3">
                    <Hand
                        isPlayer={true}
                        playerId={4}
                        direction={'across'}
                        hand={[]}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Table
