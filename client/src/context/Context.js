import { createContext, useEffect, useReducer } from 'react';
import Reduser from './Reduser';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetchting: false,
    error: false
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state,dispatch]=useReducer(Reduser,INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return <Context.Provider
    value={{
        user:state.user,
        isFetchting:state.isFetchting,
        error:state.error,
        dispatch,
    }}
    >
        {children}
    </Context.Provider>
}
