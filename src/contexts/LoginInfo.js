import React, {useState, createContext} from 'react';

const LoginContext = createContext({
    user: {email: "", password: "", autoLogin: false},
    dispatch: () => {},
});

const LoginProvider = ({children}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);

    const dispatch = ({email, password, autoLogin}) => {
        setUser({email, password, autoLogin});
    };

    const value = {
        user: {email, password, autoLogin},
        actions: {setEmail,setPassword,setAutoLogin}
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

const {Consumer: LoginConsumer} = LoginContext;

export {LoginConsumer, LoginProvider};
export default LoginContext;