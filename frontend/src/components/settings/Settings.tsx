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
                <div className="h-44">
                    <Card
                        card={{ value: Value.A, suit: Suit.C }}
                        direction={'across'}
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
                            isActive={profile.cardSize === 1}
                        />
                        <Button
                            text={'Medium'}
                            onClick={() => {
                                handleChangeCardSize(2)
                            }}
                            isActive={profile.cardSize === 2}
                        />
                        <Button
                            text={'Large'}
                            onClick={() => {
                                handleChangeCardSize(3)
                            }}
                            isActive={profile.cardSize === 3}
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
                            isActive={profile.cardFontWeight === 1}
                        />
                        <Button
                            text={'Semi-Bold'}
                            onClick={() => {
                                handleChangeFontWeight(2)
                            }}
                            isActive={profile.cardFontWeight === 2}
                        />
                        <Button
                            text={'Bold'}
                            onClick={() => {
                                handleChangeFontWeight(3)
                            }}
                            isActive={profile.cardFontWeight === 3}
                        />
                    </div>
                </div>
                <div>
                    <Button text={'Back to Main Menu'} link={'/'} />
                </div>
            </div>
            {/* <h1>
        Current Color:
        <select
          onChange={(e) => handleSetColor(e.target.value)}
          value={profile.color}
        >
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </h1> */}
        </Container>
    )
}

export default Settings
