import React, { createContext, useReducer, useContext } from 'react'
import Modal from '../components/ui/Modal';

interface ModalProperties {
    title: string
    component: React.ReactNode;
}

interface ModalState {
    modal: ModalProperties | null | undefined;
}

const initialState: ModalState = {
    modal: null
}
const ModalContext = createContext<{
    modal: ModalState;
    dispatch: React.Dispatch<Action>
}>({ modal: initialState, dispatch: () => null })

export const ModalProvider = ({ children }: any) => {
    const [modal, dispatch] = useReducer(modalReducer, initialState)
    return (
        <ModalContext.Provider value={{ modal, dispatch }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}
type Action =
    | { type: 'showModal'; modal: ModalProperties }
    | { type: 'closeModal'; }

const modalReducer = (state: any, action: Action) => {
    switch (action.type) {
        case 'showModal':
            return { ...state, modal: action.modal }
        case 'closeModal':
            return { ...state, modal: null }
        default:
            return state
    }
}
