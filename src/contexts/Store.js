import React, {createContext, useState} from "react";

// 추가할 부분 있으면 수정하기 
const StoreContext = createContext(
    {
        //업체 정보
        email: "default",
        emailDispatch: () => {},

        password: "default",
        passwordDispatch: ()=> {},

        name: "default",
        nameDispatch: () => {},

        doc: "default",
        docDispatch: () => {},
    }
);

const StoreProvider = ({children}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [doc, setDoc] = useState('');
    

    const value = {
        email: {email},
        emailDispatch : setEmail,

        password: {password},
        passwordDispatch: setPassword,

        name: {name},
        nameDispatch: setName,

        doc: {doc},
        docDispatch: setDoc,
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>

};

const StoreConsumer = StoreContext.Consumer;

export {StoreConsumer,StoreProvider};
export default StoreContext;