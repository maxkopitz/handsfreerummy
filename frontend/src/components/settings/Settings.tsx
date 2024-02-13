import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'

const Settings = () => {
    const { profile, dispatch } = useProfile()

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '20px',
        margin: '10px',
        cursor: 'pointer',
        border: 'black',
    }

    const handleIncreaseFont = () => {
        dispatch({ type: 'increaseFontSize' })
    }

    const handleDecreaseFont = () => {
        dispatch({ type: 'decreaseFontSize' })
    }

    //   const handleSetColor = (color: string) => {
    //     dispatch({ type: "changeColor", color });
    //   };

    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <div className="mb-10 border-b border-gray-300 p-2">
                    <h1 className="text-slate-500 text-5xl font-bold">
                        Settings
                    </h1>
                </div>
                <div>
                    <Card
                        card={{ value: Value.A, suit: Suit.C }}
                        direction={'across'}
                        isBack={false}
                    />
                </div>
                <div>
                    <h1>Current Font Size: {profile.fontSize} </h1>
                    <h1>Change Font Size</h1>
                    <button onClick={handleDecreaseFont} style={buttonStyle}>
                        -
                    </button>
                    <button onClick={handleIncreaseFont} style={buttonStyle}>
                        +
                    </button>
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
