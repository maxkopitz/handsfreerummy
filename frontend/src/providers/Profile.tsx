import React, { createContext, useReducer, useContext } from "react";

interface Profile {
  color: string;
  fontSize: number;
}

const initialState: Profile = {
  color: "black",
  fontSize: 16,
};

const ProfileContext = createContext<{
  profile: Profile;
  dispatch: React.Dispatch<Action>;
}>({ profile: initialState, dispatch: () => null });

export const ProfileProvider = ({ children }: any) => {
  const [profile, dispatch] = useReducer(profileReducer, initialState);
  return (
    <ProfileContext.Provider value={{ profile, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
type Action =
  | { type: "increaseFontSize" }
  | { type: "decreaseFontSize" }
  | { type: "changeColor"; color: string };

const profileReducer = (state: any, action: Action) => {
  switch (action.type) {
    case "increaseFontSize":
      return { ...state, fontSize: state.fontSize + 1 };
    case "decreaseFontSize":
      return { ...state, fontSize: state.fontSize - 1 };
    case "changeColor":
      return { ...state, color: action.color };
    default:
      return state;
  }
};
