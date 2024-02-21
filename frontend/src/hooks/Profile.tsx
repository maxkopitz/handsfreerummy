import React, { createContext, useReducer, useContext, useEffect } from 'react'

interface Settings {
    color: string
    cardSize: number
    cardFontWeight: number
}
interface Profile {
    settings: Settings
}

const initialState: Profile = {
    settings: {
        color: 'black',
        cardSize: 2,
        cardFontWeight: 1,
    }
}

const ProfileContext = createContext<{
    profile: Profile
    dispatch: React.Dispatch<Action>
}>({ profile: initialState, dispatch: () => null })

export const initializer = (initialValue = initialState) => {
    if (localStorage.getItem("profile") !== null) {

        return JSON.parse(localStorage.getItem("profile") || '');
    }
    return initialValue;
}

export const ProfileProvider = ({ children }: any) => {
    const [profile, dispatch] = useReducer(profileReducer, initialState, initializer)
    useEffect(() => {
        localStorage.setItem('profile', JSON.stringify(profile))
    }, [profile])
    return (
        <ProfileContext.Provider value={{ profile, dispatch }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => {
    return useContext(ProfileContext)
}
type Action =
    | { type: 'changeCardSize'; size: number }
    | { type: 'changeColor'; color: string }
    | { type: 'changeCardFontWeight'; size: number }

const profileReducer = (state: any, action: Action) => {
    switch (action.type) {
        case 'changeCardSize':
            return { ...state, settings: { ...state.settings, cardSize: action.size } }
        case 'changeCardFontWeight':
            return { ...state, settings: { ...state.settings, cardFontWeight: action.size } }
        case 'changeColor':
            return { ...state, settings: { ...state.settings, color: action.color } }
        default:
            return state
    }
}
