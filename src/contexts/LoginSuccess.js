import React,{createContext, useState} from 'react';

const LoginContext = createContext({
    success: false,
    setSuccess: () => {},
});

const LoginProvider = ({children}) => {
    const [success, setSuccess] = useState(false);

    const value = {
        success,
        setSuccess
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

const {Consumer: LoginConsumer} = LoginContext;

export {LoginContext, LoginConsumer,LoginProvider};

