import React,{useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from '../components';
import { ProgressContext } from '../contexts';
import MainStack from "./MainStack";
import MainTab from './MainTab';

import { LoginProvider, LoginConsumer, LoginContext } from '../contexts';

const Navigation = () => {
    const {inProgress} = useContext(ProgressContext);
    const {user} = useContext(LoginContext);

    return (
        <LoginProvider>
        <NavigationContainer>
            {user?.email && user?.password ? <MainStack /> : <AuthStack />}
            {inProgress&&<Spinner />}
        </NavigationContainer>
        </LoginProvider>
    );
};

export default Navigation;