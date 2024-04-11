import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'
import Button from '../../ui/Button'
import { useEffect, useState } from 'react'
import { CardType, TurnState } from '../../../Type'
import { parseVerbalNumberToNumber, selectedCards } from '../../../lib/parsers'
import { toast } from 'react-hot-toast'

interface DictaphoneProps {
    playerId?: number
    isTurn: boolean
    turnState: TurnState
    handleDiscard: any
    handleCardClick: any
    handleSortCardClick: any
    handleClickMeld: any
    handlePickupPickup: any
    handlePickupDiscard: any
    hand: CardType[]
}
const Dictaphone = ({
    playerId,
    hand,
    isTurn,
    turnState,
    handleDiscard,
    handleCardClick,
    handleSortCardClick,
    handleClickMeld,
    handlePickupPickup,
    handlePickupDiscard,
}: DictaphoneProps) => {
    const getCommands = () => {
        const commands = [
            {
                command: ['sort'],
                callback: () => handleSortCardClick(),
            },
            {
                command: 'select :card',
                callback: (card: string) => {
                    handleCardClick({
                        card: hand[parseVerbalNumberToNumber(card) - 1],
                    })
                },
            },
        ]
        if (turnState.stage === 'start') {
            commands.push(
                {
                    command: ['discard', 'left'],
                    callback: () => handlePickupDiscard(),
                },
                {
                    command: ['pick up', 'right'],
                    callback: () => handlePickupPickup(),
                }
            )
        } else if (turnState.stage === 'end') {
            commands.push(
                {
                    command: ['discard'],
                    callback: () => handleDiscard(),
                },
                {
                    command: ['lay off'],
                    callback: () => {},
                },
                {
                    command: ['meld'],
                    callback: () => {
                        if (selectedCards(hand).length < 3) {
                            toast.error(
                                'Please select at least 3 cards to create a meld.'
                            )
                            return
                        }
                        handleClickMeld()
                    },
                }
            )
        }

        return commands
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands: getCommands() })

    const [message, setMessage] = useState('')

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
                    SpeechRecognition.startListening({ continuous: true })
                }}
            />
            <Button onClick={SpeechRecognition.stopListening} text={'Stop'} />
            <Button onClick={resetTranscript} text={'Reset'} />
            <p>Transcript: {transcript}</p>
            <p>Message: {message}</p>
        </div>
    )
}

export default Dictaphone
