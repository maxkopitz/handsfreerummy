import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'
import Button from '../../ui/Button'
import { CardType, TurnState } from '../../../Type'
import { parseVerbalNumberToNumber, selectedCards } from '../../../lib/parsers'
import { toast } from 'react-hot-toast'
// @ts-ignore
import createSpeechServicesPonyfill from 'web-speech-cognitive-services/lib/SpeechServices';
import { AZURE_TRANSCRIBE_REGION, AZURE_TRANSCRIBE_SUBSCRIPTION_KEY } from '../../../config'




if (AZURE_TRANSCRIBE_REGION && AZURE_TRANSCRIBE_SUBSCRIPTION_KEY) {
    const { SpeechRecognition: AzureSpeechRecognition } = createSpeechServicesPonyfill({
        credentials: {
            region: AZURE_TRANSCRIBE_REGION,
            subscriptionKey: AZURE_TRANSCRIBE_SUBSCRIPTION_KEY,
        }
    });
    SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
}

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
                    const parsedNumber : number = parseVerbalNumberToNumber(card)
                    if (parsedNumber === -1) {
                        toast.error('An error occured when selecting a card, please select the card again.')
                    }
                    handleCardClick({
                        card: hand[parsedNumber - 1],
                    })
                },
            },
        ]
        if (turnState.stage === 'start' && isTurn) {
            commands.push(
                {
                    command: ['discard', 'left', 'this card', 'This card.'],
                    callback: () => handlePickupDiscard(),
                },
                {
                    command: ['pick up', 'right', 'pickup', 'Pick up.'],
                    callback: () => handlePickupPickup(),
                }
            )
        } else if (turnState.stage === 'end' && isTurn) {
            commands.push(
                {
                    command: ['discard', 'left', 'this card', 'This card.'],
                    callback: () => handleDiscard(),
                },
                {
                    command: ['lay off'],
                    callback: () => { },
                },
                {
                    command: ['meld', 'melts'],
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
                    SpeechRecognition.startListening({ continuous: true, language: 'en-us' })
                }}
            />
            <Button onClick={SpeechRecognition.stopListening} text={'Stop'} />
            <Button onClick={resetTranscript} text={'Reset'} />
            <p>Transcript: {transcript}</p>
        </div>
    )
}

export default Dictaphone
