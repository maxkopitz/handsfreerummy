import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'
import Button from '../../ui/Button'
import { useState } from 'react'
const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition()

    const [message, setMessage] = useState('')

    const commands = [
        {
            command: 'I would like to order *',
            callback: (food: string) =>
                setMessage(`Your order is for: ${food}`),
        },
    ]

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>
    }
    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <Button
                text="Start"
                onClick={(event: any) => {
                    event.preventDefault()
                    SpeechRecognition.startListening()
                }}
            />
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>Transcript: {transcript}</p>
        </div>
    )
}

export default Dictaphone
