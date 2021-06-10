import React, {createContext, useState} from "react";

// 추가할 부분 있으면 수정하기 
const UserContext = createContext(
    {
        //사용자 정보
        email: "default",
        emailDispatch: () => {},

        password: "default",
        passwordDispatch: ()=> {},

        name: "default",
        nameDispatch: () => {},

        sex: "default",
        sexDispatch: () =>{},

        age: "default",
        ageDispatch: () => {},
    }
);

const UserProvider = ({children}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');

    const value = {
        email: {email},
        emailDispatch : setEmail,

        password: {password},
        passwordDispatch: setPassword,

        name: {name},
        nameDispatch: setName,

        sex: {sex},
        sexDispatch: setSex,

        age: {age},
        ageDispatch: setAge
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

};

const UserConsumer = UserContext.Consumer;

export {UserConsumer,UserProvider};
export default UserContext;