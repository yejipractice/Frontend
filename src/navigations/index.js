import React,{useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from '../components';
import { ProgressContext, LoginConsumer, LoginContext, LoginProvider } from '../contexts';
import MainStack from "./MainStack";
import MainTab from './MainTab';
import {SafeAreaView,Text,View} from "react-native";


const Navigation = () => {
    const {inProgress} = useContext(ProgressContext);
    const {success} = useContext(LoginContext);

    return (
        <>
        <SafeAreaView />
        <NavigationContainer>
            <MainTab />
            {/* {success? <MainTab />: <AuthStack />} */}
            {inProgress&&<Spinner />}
        </NavigationContainer>
        </>
    );
};

export default Navigation;