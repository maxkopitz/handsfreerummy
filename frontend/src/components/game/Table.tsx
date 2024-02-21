import Container from '../ui/Container'
import Board from './Board'
import Hand from './Hand'
import { Suit, Value } from '../../Type'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'
import { API_URL } from '../../config'

const Table = () => {
    const { dispatch } = useModal()

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
            <Modal />
            <div className="grid grid-cols-5">
                <div>
                    <div>
                        <Button text={'Back to Main Menu'} link={'/'} />
                    </div>
                    <div>
                        <Button
                            text={'Settings'}
                            onClick={() =>
                                dispatch({
                                    type: 'showModal',
                                    modal: {
                                        title: 'Settings',
                                        component: <Settings />,
                                    },
                                })
                            }
                        />
                    </div>
                </div>
                <div className="col-start-2">
                    <Hand isPlayer={false} playerId={1} hand={[]} />
                </div>
                <div className="col-start-3">
                    <Hand isPlayer={false} playerId={2} hand={[]} />
                </div>
                <div className="col-start-4">
                    <Hand isPlayer={false} playerId={3} hand={[]} />
                </div>
                <div className="col-span-3">
                    <Board
                        playedRuns={dummyRuns}
                        discard={{ value: Value.Six, suit: Suit.H }}
                    />
                </div>
                <div className="col-start-2">
                    <h1>Melds</h1>
                </div>
                <div className="col-start-2 col-span-3">
                    <Hand isPlayer={true} playerId={4} hand={[]} />
                </div>
            </div>
        </Container>
    )
}

export default Table
