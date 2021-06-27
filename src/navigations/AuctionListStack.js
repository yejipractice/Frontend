import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import AuctionListTab from './AuctionListTab';
import AuctionDetailStack from './AuctionDetailStack';

const Stack = createStackNavigator();

const AuctionListStack = ({navigation, route}) => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle:{ backgroundColor: theme.backgroundColor},
        }}>
            <Stack.Screen name="공고 목록" component={AuctionListTab} 
            options={{headerBackTitle: false, headerTitleAlign: 'left',  headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},}}/>
            <Stack.Screen name="AuctionDetail" component={AuctionDetailStack}
                options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default AuctionListStack;