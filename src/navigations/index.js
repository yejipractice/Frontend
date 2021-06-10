import React,{useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from '../components';
import { ProgressContext } from '../contexts/Progress';
import MainStack from "./MainStack";
import MainTab from './MainTab';

const Navigation = () => {
    const {inProgress} = useContext(ProgressContext);

    return (
        <NavigationContainer>
            <AuthStack />
            {/* <MainTab /> */}
            {inProgress&&<Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;