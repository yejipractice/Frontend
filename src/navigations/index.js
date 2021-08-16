import React,{useContext, useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from '../components';
import { ProgressContext, LoginConsumer, LoginContext, LoginProvider, UrlContext } from '../contexts';
import MainStack from "./MainStack";
import MainTab from './MainTab';
import {SafeAreaView} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
    const {inProgress, spinner} = useContext(ProgressContext);
    const {success, autoLogin, setSuccess, setToken, setMode, setId, setAllow, setDoc, setAutoLogin} = useContext(LoginContext);
    const {url} = useContext(UrlContext);
    const [isReady, setIsReady] = useState(false);

    const getTokenData = async () => {
        try{
            spinner.start()
            var res = await AsyncStorage.getItem("UserToken");
            if(res!==null){
                setSuccess(true);
                setAutoLogin(true);
                setToken(res);
                var UserId = await AsyncStorage.getItem("UserId");
                setId(UserId);
                var UserMode = await AsyncStorage.getItem("UserMode");
                setMode(UserMode);
                var UserAllow = await AsyncStorage.getItem("UserAllow");
                setAllow(UserAllow);
                if(UserMode === "Store"){
                    var UserDoc = await AsyncStorage.getItem("UserDoc");
                    setDoc(UserDoc);
                }
            };
            return (res!==null);
        }catch(e){
            console.error(e);
        }finally{
            spinner.stop();
        }
    };

    useEffect(()=>{
       var res = getTokenData();
       if(res){
        setIsReady(true);
       }
    },[]);

    return (
        <>
        <SafeAreaView />
        <NavigationContainer>
            {/* <MainTab /> */}
            {isReady? <MainTab />: <AuthStack />}
            {inProgress&&<Spinner />}
        </NavigationContainer>
        </>
    );
};

export default Navigation;