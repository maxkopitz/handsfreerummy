import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'
import Button from '../../ui/Button'
import { CardType, Meld, TurnState } from '../../../Type'
import { useEffect } from 'react'
import { parseVerbalNumberToNumber, selectedCards } from '../../../lib/parsers'
import { toast } from 'react-hot-toast'
// @ts-ignore
import createSpeechServicesPonyfill from 'web-speech-cognitive-services/lib/SpeechServices'
import {
    AZURE_TRANSCRIBE_REGION,
    AZURE_TRANSCRIBE_SUBSCRIPTION_KEY,
} from '../../../config'

import { useMemo } from 'react'

if (AZURE_TRANSCRIBE_REGION && AZURE_TRANSCRIBE_SUBSCRIPTION_KEY) {
    const { SpeechRecognition: AzureSpeechRecognition } =
        createSpeechServicesPonyfill({
            credentials: {
                region: AZURE_TRANSCRIBE_REGION,
                subscriptionKey: AZURE_TRANSCRIBE_SUBSCRIPTION_KEY,
            },
        })
    SpeechRecognition.applyPolyfill(AzureSpeechRecognition)
}

interface DictaphoneProps {
    playerId?: number
    isTurn: boolean
    turnState: TurnState
    handleDiscard: () => void
    handleSelectCard: (card: CardType) => void
    handleSortCards: any
    handleCreateMeld: any
    handlePickupPickup: any
    handlePickupDiscard: any
    handleLayoff: any
    hand: CardType[]
    micIsOn: boolean
    melds: Meld[]
}

const Dictaphone = ({
    playerId,
    hand,
    isTurn,
    turnState,
    handleDiscard,
    handleSelectCard,
    handleSortCards,
    handleCreateMeld,
    handlePickupPickup,
    handlePickupDiscard,
    micIsOn,
    handleLayoff,
    melds,
}: DictaphoneProps) => {
    const commands = useMemo(() => {
        const commands = [
            {
                command: ['sort', 'Sort.'],
                callback: () => handleSortCards(),
            },
            {
                command: 'select :card',
                callback: (card: string) => {
                    const parsedNumber: number = parseVerbalNumberToNumber(card)
                    if (parsedNumber === -1) {
                        toast.error(
                            'An error occured when selecting a card, please select the card again.'
                        )
                        return
                    }
                    handleSelectCard(hand[parsedNumber - 1])
                },
            },
        ]
        if (turnState.stage === 'start' && isTurn) {
            commands.push(
                {
                    command: [
                        'discard',
                        'left',
                        'this card',
                        'This card.',
                        'Discard.',
                    ],
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
                    command: [
                        'discard',
                        'left',
                        'this card',
                        'This card.',
                        'Discard.',
                    ],
                    callback: () => handleDiscard(),
                },
                {
                    command: 'layoff :meldId',
                    callback: (meldId: string) => {
                        const parsedNumber: number =
                            parseVerbalNumberToNumber(meldId)
                        console.log(parsedNumber)
                        if (parsedNumber === -1) {
                            toast.error(
                                'An error occured when selecting a card, please select the card again.'
                            )
                            return
                        }
                        if (selectedCards(hand).length !== 1) {
                            toast.error('Please select 1 card for layoff.')
                            return
                        }
                        handleLayoff(melds[parsedNumber - 1])
                    },
                },
                {
                    command: ['meld', 'melts', 'Meld.'],
                    callback: () => {
                        if (selectedCards(hand).length < 3) {
                            toast.error(
                                'Please select at least 3 cards to create a meld.'
                            )
                            return
                        }
                        handleCreateMeld()
                    },
                }
            )
        }

        return commands
    }, [turnState, hand])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands: commands })

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
                    SpeechRecognition.startListening({
                        continuous: true,
                        language: 'en-us',
                    })
                }}
            />

            <Button
                onClick={() => {
                    if (browserSupportsSpeechRecognition && listening) {
                        SpeechRecognition.stopListening()
                    }
                }}
                text={'Stop'}
            />
            <Button onClick={resetTranscript} text={'Reset'} />
            <p>Transcript: {transcript}</p>
        </div>
    )
}

export default Dictaphone
