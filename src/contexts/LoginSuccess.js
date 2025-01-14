import React,{createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContext = createContext({
    success: false,
    allow: false,
    mode: null,
    doc: false,
    token: null,
    autoLogin: false,
    id : null,
    stores: null,
    latitude: null,
    longitude: null,
    setSuccess: () => {},
    setAllow: () => {},
    setMode: () => {},
    setDoc: () => {},
    setToken: () => {},
    setAutoLogin: () => {},
    setId: () => {},
    setStores: () => {},
    setLongitude: () => {},
    setLatitude: () => {}
});

const LoginProvider = ({children}) => {
    const [success, setSuccess] = useState(false);
    const [allow, setAllow] = useState(false);
    const [mode, setMode] = useState(null);
    const [doc, setDoc] = useState(false);
    const [token, setToken] = useState(null);
    const [autoLogin, setAutoLogin] = useState(false);
    const [id, setId] = useState(null);
    const [stores, setStores] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const value = {
        success, //로그인 성공 여부
        setSuccess,
        allow, // 위치 권한 허용 여부
        setAllow,
        mode, // 사용자 or 업체
        setMode,
        doc, // 업체 서류 등록 여부
        setDoc,
        token, 
        setToken,
        autoLogin,
        setAutoLogin,
        id,
        setId,
        stores,
        setStores,
        latitude, 
        setLatitude,
        longitude,
        setLongitude
    };

    const setData = (token, autoLogin, allow, mode, doc, id, longitude, latitude) => {
        let data = {
            token: token,
            autoLogin: autoLogin,
            allow: allow,
            mode: mode,
            doc: doc,
            id: id,
            longitude: longitude,
            latitude: latitude,
        };
    };

    useEffect(() => {
        setData(token, autoLogin, allow, mode, doc, id, longitude, latitude);
    },[token, autoLogin, allow, mode, doc, id, longitude, latitude]);

    useEffect(()=> {
        console.log("itss id")
        if(autoLogin && id!==null){
            var UId = {id : id};
            AsyncStorage.mergeItem("UserId", JSON.stringify(UId));
        }
    },[id, autoLogin]);

    useEffect(()=> {
        console.log("itss mode")
        if(autoLogin && mode!==null){
            var UMd = {mode : mode};
            AsyncStorage.mergeItem("UserMode", JSON.stringify(UMd));    
        }
    },[mode ,autoLogin]);

    useEffect(()=>{
        console.log("itss doc")
        if(autoLogin && mode ==="Store"){
            var UDc = {doc : doc};
            AsyncStorage.mergeItem("UserDoc", JSON.stringify(UDc));
        }
    },[doc, autoLogin]);

    useEffect(()=>{
        console.log("itss allow")
        if(autoLogin){
            var UAl = {allow: allow};
            AsyncStorage.mergeItem("UserAllow", JSON.stringify(UAl));
        }
    },[allow]);

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

const {Consumer: LoginConsumer} = LoginContext;

export {LoginContext, LoginConsumer,LoginProvider};

