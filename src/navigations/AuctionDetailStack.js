import React,{useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack'
import {AuctionDetail,AuctionBid,Message} from "../screens";
const Stack = createStackNavigator();

const AuctionDetailStack = ({navigation, route}) => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        initialRouteName="AuctionDetail"
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle:{ backgroundColor: theme.backgroundColor},
        }}>
        <Stack.Screen name="AuctionDetail" component={AuctionDetail}
                initialParams={route.params}
                options={{ headerTitle: " ", headerStyle: { elevation: 0 } }} />
        <Stack.Screen name="Message" component={Message} options={{ headerTitle: "" }} />
        <Stack.Screen name="AuctionBid" component={AuctionBid}
                options={{ headerBackTitle: false, headerTitle: "경매 입찰 등록", headerTitleAlign: 'left' }} />    
        </Stack.Navigator>
    );
};

export default AuctionDetailStack;