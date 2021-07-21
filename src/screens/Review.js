import React, {useState} from 'react';
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Reviews} from "../utils/data";
import {Dimensions} from "react-native";


const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const List = styled.ScrollView`
    flex: 1;
`;

const InfoContainer = styled.View`
    padding: 0 1%;
    padding-top: 3%;
    padding-bottom: 3%;
`;

const UserImage = styled.Image`
    background-color:${({theme}) => theme.imageBackground};
    height: ${HEIGHT*0.3*0.15}px;
    width: ${HEIGHT*0.3*0.15}px;
    border-radius: 50px;
    margin-right: 4%;
`;

const ReviewImage = styled.Image`
    background-color:${({theme}) => theme.imageBackground};
    width: ${WIDTH*0.98}px;
    height: ${HEIGHT*0.3}px;
`;

const DefaultText = styled.Text`
    font-size: 15px;
    color: ${({theme})=> theme.label};
    font-weight: bold;
`;

const TitleText = styled.Text`
    font-size: 18px;
    color: ${({theme})=> theme.text};
    font-weight: bold;
`;

const UserInfoContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 2% 1%;
    align-items: center;
`;

const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const MentContainer = styled.View`
    background-color:${({theme}) => theme.background};
    border-width: 1px;
    height: ${HEIGHT*0.1}px;
    padding: 2%;
    margin: 1% 0;
`;

const StarContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Stars = ({score}) => {
    var list = [];
    var one = parseInt(score);
    var half = parseInt(score/0.5); 
    let i = 0;
    if(score % 2 == 0){
        for(i = 0; i<one;i++)
        {
            list.push(<MaterialCommunityIcons name="star" size={25} color="yellow"/>)
        }
    }else {
        for(i = 0; i<one;i++)
        {
            list.push(<MaterialCommunityIcons name="star" size={25} color="yellow"/>)
        }
        if((half - one*2) !== 0){
            list.push(<MaterialCommunityIcons name="star-half" size={25} color="yellow"/>)
        }
    }
    return list;
};

const ReviewSet = ({review: {id, date, name, score, ment, src, userSrc}}) => {
    return (
        <InfoContainer>
            <DefaultText>{date}</DefaultText>
            <UserInfoContainer>
                <UserContainer>
                    <UserImage source={{uri: userSrc}}/>
                    <TitleText>{name}</TitleText>
                </UserContainer>
                    <StarContainer>
                        <TitleText>별점: </TitleText>
                        <Stars score={score}/>
                    </StarContainer>
            </UserInfoContainer>
            <ReviewImage source={{uri: src}}/>
            <MentContainer><DefaultText>{ment}</DefaultText></MentContainer>
        </InfoContainer>
    );
};

const Review = ({navigation, route}) => {
   
    

    return (
        <KeyboardAwareScrollView
        extraScrollHeight={20}>
            <List>
               {Reviews.map(review => (
                   <ReviewSet key={review['id'].toString()} review={review}/>
               ))} 
            </List>
        </KeyboardAwareScrollView>
    );
};

export default Review;