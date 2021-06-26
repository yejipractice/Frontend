import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Auction,AuctionFinished} from "../screens";
import {Dimensions} from "react-native";

const HEIGHT = Dimensions.get("screen").width;

const Tab = createMaterialTopTabNavigator();

const AuctionListTab = () => {
    return (
        <Tab.Navigator
        tabBarOptions={{
            labelStyle: {fontSize: 15, fontWeight: "bold"},
            tabStyle: {height: HEIGHT* 0.135}
        }}>
            <Tab.Screen name="Auction" component={Auction} options={{tabBarLabel: "진행중"}}/>
            <Tab.Screen name="AuctionFinished" component={AuctionFinished} options={{tabBarLabel: "마감"}}/>
        </Tab.Navigator>
    );
};

export default AuctionListTab;