import JoinGame from './joingame/JoinGame'
import Button from './ui/Button'
import Container from './ui/Container'
import { useModal } from '../hooks/Modal'
import Settings from './settings/Settings'
import CreateGame from './game/CreateGame'

const MainMenu = () => {
    const { dispatch } = useModal();
    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <div className="mb-20 mt-20">
                    <h1 className="text-slate-500 text-5xl font-bold">
                        Handsfree Rummy
                    </h1>
                </div>
                <JoinGame />
                <div>
                    <Button text={'Create Game'} onClick={() => dispatch(
                        {
                            type: 'showModal', modal:
                                { title: "Create Game", component: <CreateGame /> }
                        })} />

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
                <div>
                    <Button text={'About'} link={'about'} />
                </div>
            </div>
        </Container>
    )
}
export default MainMenu
