import React, {useContext, useState} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import {Mypage_Store, Mypage_User, StoreInfo, StoreInfoChange, UserInfo, UserInfoChange} from "../screens";


const Stack = createStackNavigator();

const MypageStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        initialRouteName="Mypage_User"
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle:{ backgroundColor: theme.backgroundColor},
        }}>
            <Stack.Screen name="Mypage_Store" component={Mypage_Store} 
                options={{headerBackTitle: false, headerTitle: "My Page", headerTitleAlign: 'left',  headerTitleStyle: {fontSize: 25, fontWeight: 'normal'},}}
            />
            <Stack.Screen name="Mypage_User" component={Mypage_User} 
                options={{headerBackTitle: false, headerTitle: "My Page", headerTitleAlign: 'left',  headerTitleStyle: {fontSize: 25, fontWeight: 'normal'},}}
            />
            <Stack.Screen name="StoreInfo" component={StoreInfo} options={{headerBackTitle: false, headerTitle: "회원 정보", headerTitleAlign: 'center',  headerTitleStyle: {fontSize: 20, fontWeight: 'normal'},}}/>
            <Stack.Screen name="StoreInfoChange" component={StoreInfoChange} options={{headerBackTitle: false, headerTitle: "회원 정보 수정", headerTitleAlign: 'center',  headerTitleStyle: {fontSize: 20, fontWeight: 'normal'},}}/>
            <Stack.Screen name="UserInfo" component={UserInfo} options={{headerBackTitle: false, headerTitle: "회원 정보", headerTitleAlign: 'center',  headerTitleStyle: {fontSize: 20, fontWeight: 'normal'},}}/>
            <Stack.Screen name="UserInfoChange" component={UserInfoChange} options={{headerBackTitle: false, headerTitle: "회원 정보 수정", headerTitleAlign: 'center',  headerTitleStyle: {fontSize: 20, fontWeight: 'normal'},}}/>
        </Stack.Navigator>
    );
}

export default MypageStack;