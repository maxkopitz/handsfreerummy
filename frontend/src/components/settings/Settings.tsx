import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'

const Settings = () => {
    const { profile, dispatch } = useProfile()

    const handleChangeCardSize = (size: number) => {
        dispatch({ type: 'changeCardSize', size })
    }

    const handleChangeFontWeight = (size: number) => {
        dispatch({ type: 'changeCardFontWeight', size })
    }

    const handleNameChange = (event: any) => {
        dispatch({ type: 'setDisplayname', value: event.target.value })
    }

    const handleVoiceControl = () => {
        dispatch({ type: 'toggleVoiceControl' })
    }

    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <div className="h-44 mb-10">
                    <Card
                        card={{
                            value: Value.A,
                            suit: Suit.C,
                            isSelected: false,
                        }}
                        isActive={true}
                    />
                </div>
                <div className="justify-center">
                    <div>
                        <label className="text-xl">Display Name</label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={profile.displayName}
                            onChange={handleNameChange}
                        />
                    </div>
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
                <div>
                    <Button
                        text={
                            profile.settings.voiceControl
                                ? 'Voice Control On'
                                : 'Voice Control Off'
                        }
                        onClick={() => {
                            handleVoiceControl()
                        }}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Settings
