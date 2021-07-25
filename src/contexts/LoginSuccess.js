import React,{createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const setData = (success,allow,mode,doc) => {
        let data = {
            success: success,
            allow: allow,
            mode: mode,
            doc: doc,
        };
        AsyncStorage.setItem('user_infomation', JSON.stringify(data));
        console.log(JSON.stringify(data))
    };

    useEffect(() => {
        setData(success, allow, mode, doc);
    },[success, allow, mode, doc]);

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

const {Consumer: LoginConsumer} = LoginContext;

export {LoginContext, LoginConsumer,LoginProvider};

