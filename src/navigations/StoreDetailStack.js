import React,{useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack'
import {StoreDetail, Message, Review} from "../screens";

const Stack = createStackNavigator();

const StoreDetailStack = ({navigation, route}) => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        initialRouteName="StoreDetail"
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle:{ backgroundColor: theme.backgroundColor},
        }}>
            <Stack.Screen name="StoreDetail" component={StoreDetail}
            initialParams={route.params}
            options={{headerTitle: " ", headerStyle: { elevation: 0 } }} />
            <Stack.Screen name="Message" component={Message} options={{ headerTitle: "" }} />
            <Stack.Screen name="Review" component={Review} options={{ headerTitle: "리뷰", headerTitleAlign: 'left', headerTitleStyle: { fontSize: 25, fontWeight: 'bold' } }} />
        </Stack.Navigator>
    );
};

export default StoreDetailStack;