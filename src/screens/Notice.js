import React, {useState} from 'react';
import {notices} from "../utils/data";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {MaterialCommunityIcons} from "@expo/vector-icons";

const AlertContainer = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: row;
    padding: 10px;
    border-bottom-width: 0.5px;
    border-top-width: 0.5px;
    border-color: ${({theme}) => theme.label};
`;

const List = styled.ScrollView`
    flex: 1;
`;

const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

const TextContainer = styled.View`
    flex: 1;
`;

const TitleContainer = styled.View`
    width: 90%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 10%;
    margin-bottom: 2%;
`;

const StyledImage = styled.Image`
    background-color: ${({theme}) => theme.imageBackground};
    height: 80;
    width: 80;
    border-radius: 50px;
`;

const NameTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme})=> theme.text};
`;

const TimeText = styled.Text`
    font-size: 13px;
    color: ${({theme})=> theme.text};
`;

const DescText = styled.Text`
    font-size: 15px;
    font-weight: normal;
    color: ${({theme})=> theme.text};
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    right: 0;
`;

const Alert = ({item: {id, scr, name, desc, time}, onPress}) => {
    return (
        <AlertContainer>
            <ImageContainer>
                <StyledImage source={{uri: scr}} />
            </ImageContainer>
            <TextContainer>
                <TitleContainer>
                    <NameTitle>{name}</NameTitle>
                    <TimeText>{time}시간전</TimeText>
                </TitleContainer>
                <DescText>{desc}</DescText>
                <CloseButton onPress={onPress}>
                <MaterialCommunityIcons name="close" size={20}/>
                </CloseButton>
            </TextContainer>
        </AlertContainer>
    );
};

const Notice = ({navigation}) => {
    const [data, setData] = useState(notices);

    const _onPress = (id) => {
        const newData = [...data];
        setData(newData.filter(function(d) {return d.id != id}));
    };


    return (
        <KeyboardAwareScrollView
        extraScrollHeight={20}
        >
       <List>
            {data.map(item => (
                <Alert key={item['id'].toString()} item={item} onPress={() => _onPress(item['id'])} />
            ))}
        </List>
        </KeyboardAwareScrollView>
    );
};



export default Notice;