import React,{useState,useContext} from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Dimensions} from "react-native";
import {Store} from "../screens"
import styled from "styled-components/native";
import { IconButton } from "../components";
import { images } from '../images';
import { ThemeContext } from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HEIGHT = Dimensions.get("screen").width;

const Tab = createMaterialTopTabNavigator();

const Container = styled.View`
    height: ${HEIGHT*0.17};
    background-color: ${({ theme }) => theme.titleColor}; 
    flex-direction:row;
`;

const SearchBox =  styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    flex: 1; 
`;

const Icon = styled.Image`
    tint-color: ${({theme})=> theme.icon};
    width: 70%;
    height: 70%;
`;

const InputContainer = styled.View`
    flex-direction: row;
    width: 98%;
    padding-left: 5%;
    align-items: center;
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
}))`
    flex: 5;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    height: 70%;
    font-size: 18px;
    border: 1px solid
      ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
    border-radius: 4px;
    padding-left: 5%;
  `;

const StoreListTab = ({navigation, route}) => {
    const theme = useContext(ThemeContext);

    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const _handleSearchPress = () => { navigation.navigate("SearchTab"), {input: input}};

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