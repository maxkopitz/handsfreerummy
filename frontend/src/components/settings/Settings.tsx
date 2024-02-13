import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'

const Settings = () => {
    const { profile, dispatch } = useProfile()
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }

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
        <Container style={containerStyle}>
            <h1>Settings</h1>
            <h1>Current Font Size: {profile.fontSize} </h1>
            <h1>
                Change Font Size
                <button onClick={handleDecreaseFont} style={buttonStyle}>
                    -
                </button>
                <button onClick={handleIncreaseFont} style={buttonStyle}>
                    +
                </button>
            </h1>

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
