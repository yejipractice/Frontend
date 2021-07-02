import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import StoreListTab from './StoreListTab';
import StoreDetailStack from './StoreDetailStack';
import {StoreMap} from "../screens";

const Stack = createStackNavigator();

const StoreListStack = ({navigation, route}) => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        screenOptions={{

        }}>
            <Stack.Screen name="StoreList" component={StoreListTab} options={{headerShown: false}}/>
            <Stack.Screen name="StoreDetailStack" component={StoreDetailStack}
                options={{headerShown: false}} />
            <Stack.Screen name="StoreMap" component={StoreMap} options={{headerTitle: " "}} />
        </Stack.Navigator>
    );
};

export default StoreListStack;