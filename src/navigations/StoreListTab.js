import React,{useState,useContext} from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Dimensions} from "react-native";
import {Store} from "../screens"
import { ThemeContext } from "styled-components";


const HEIGHT = Dimensions.get("screen").width;

const Tab = createMaterialTopTabNavigator();


const StoreListTab = ({navigation, route}) => {
    const theme = useContext(ThemeContext);



    return (
        <>
        <Tab.Navigator 
        tabBarOptions={{
            labelStyle: {fontSize: 15, fontWeight: "bold"},
            tabStyle: {height: HEIGHT* 0.135}
        }}>
            <Tab.Screen name="AllStore" component={Store} options={{tabBarLabel: "전체"}}/>
            <Tab.Screen name="KrStore" component={Store} options={{tabBarLabel: "한식"}}/>
            <Tab.Screen name="ChStore" component={Store} options={{tabBarLabel: "중식"}}/>
            <Tab.Screen name="WsStore" component={Store} options={{tabBarLabel: "양식"}}/>
            <Tab.Screen name="JpStore" component={Store} options={{tabBarLabel: "일식"}}/>
            <Tab.Screen name="EtcStore" component={Store} options={{tabBarLabel: "기타"}}/>
            
        </Tab.Navigator>
        </>
    );
};

export default StoreListTab;