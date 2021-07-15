import React,{useContext, useState} from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Dimensions} from "react-native";
import styled,{ThemeContext} from "styled-components/native";
import { images } from '../images';
import SearchStoreStack from './SearchStoreStack';
import SearchAuctionStack from './SearchAuctionStack';

const Tab = createMaterialTopTabNavigator();

const HEIGHT = Dimensions.get("screen").width;

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
    padding-left: 50px;
    align-items: center;
`

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

const SearchTab = ({navigation, route}) => {
    const [input, setInput] = useState(route.params.input);
    const [isFocused, setIsFocused] = useState(false);

    const _handleSearchPress = () => { };

    return (
        <>
        <Container>
        <InputContainer>
                    <StyledTextInput
                        value={input}
                        isFocused={isFocused}
                        onChangeText={text => setInput(text)}
                        onSubmitEditing={_handleSearchPress}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="검색하세요."
                        returnKeyType="done"
                        autoCorrect={false}
                        textContentType="none" // iOS only
                        underlineColorAndroid="transparent" // Android only
                    />
                    <SearchBox onPress={_handleSearchPress}>
                        <Icon source={images.Search} />
                    </SearchBox>
        </InputContainer>
        </Container>   
        <Tab.Navigator 
        tabBarOptions={{
            labelStyle: {fontSize: 15, fontWeight: "bold"},
            tabStyle: {height: HEIGHT* 0.135}
        }}>
            <Tab.Screen name="업체" component={SearchStoreStack}/>
            <Tab.Screen name="공고" component={SearchAuctionStack}/>
        </Tab.Navigator>
        </>
    );
};

export default SearchTab;