import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'

const Settings = () => {
    const { profile, dispatch } = useProfile()

    // const buttonStyle = {
    //     padding: '10px 20px',
    //     fontSize: '20px',
    //     margin: '10px',
    //     cursor: 'pointer',
    //     border: 'black',
    // }

    const handleChangeCardSize = (size: number) => {
        dispatch({ type: 'changeCardSize', size })
    }
    const handleChangeFontWeight = (size: number) => {
        dispatch({ type: 'changeCardFontWeight', size })
    }
    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <div className="h-44 mb-10">
                    <Card
                        card={{ value: Value.A, suit: Suit.C }}
                        isBack={false}
                    />
                </div>
                <div className="justify-center">
                    <h2 className="text-xl">Change Card Size</h2>
                    <div className="flex flex-row">
                        <Button
                            text={'Small'}
                            onClick={() => {
                                handleChangeCardSize(1)
                            }}
                            isActive={profile.settings.cardSize === 1}
                        />
                        <Button
                            text={'Medium'}
                            onClick={() => {
                                handleChangeCardSize(2)
                            }}
                            isActive={profile.settings.cardSize === 2}
                        />
                        <Button
                            text={'Large'}
                            onClick={() => {
                                handleChangeCardSize(3)
                            }}
                            isActive={profile.settings.cardSize === 3}
                        />
                    </div>
                </div>
                <div className="justify-center">
                    <h2 className="text-xl">Change Card Font Weight</h2>
                    <div className="flex flex-row">
                        <Button
                            text={'Normal'}
                            onClick={() => {
                                handleChangeFontWeight(1)
                            }}
                            isActive={profile.settings.cardFontWeight === 1}
                        />
                        <Button
                            text={'Semi-Bold'}
                            onClick={() => {
                                handleChangeFontWeight(2)
                            }}
                            isActive={profile.settings.cardFontWeight === 2}
                        />
                        <Button
                            text={'Bold'}
                            onClick={() => {
                                handleChangeFontWeight(3)
                            }}
                            isActive={profile.settings.cardFontWeight === 3}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Settings
