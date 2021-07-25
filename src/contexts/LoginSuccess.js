import React,{createContext, useState} from 'react';

const LoginContext = createContext({
    success: false,
    allow: false,
    mode: null,
    doc: false,
    setSuccess: () => {},
    setAllow: () => {},
    setMode: () => {},
    setDoc: () => {},
});

const LoginProvider = ({children}) => {
    const [success, setSuccess] = useState(false);
    const [allow, setAllow] = useState(false);
    const [mode, setMode] = useState(null);
    const [doc, setDoc] = useState(false);

    const value = {
        success,
        setSuccess,
        allow,
        setAllow,
        mode,
        setMode,
        doc,
        setDoc,
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

const {Consumer: LoginConsumer} = LoginContext;

export {LoginContext, LoginConsumer,LoginProvider};

