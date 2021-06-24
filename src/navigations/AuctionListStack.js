import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import AuctionListTab from './AuctionListTab';

const Stack = createStackNavigator();

const AuctionListStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle:{ backgroundColor: theme.backgroundColor},
        }}>
            <Stack.Screen name="공고 목록" component={AuctionListTab} 
            options={{headerBackTitle: false, headerTitleAlign: 'left',  headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},}}/>
        </Stack.Navigator>
    );
};

export default AuctionListStack;