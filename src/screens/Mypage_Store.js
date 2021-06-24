import React from 'react';
import styled from "styled-components/native";
import MypageButton from '../components/MypageButton';
import ProfileImage from '../components/ProfileImage';
import SmallButton from '../components/SmallButton';

const Container = styled.View`
    background-color: ${({theme})=> theme.background};
    flex: 1;
    padding: 0 50px;
`;

const IconContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
`;

const InfoContainer = styled.View`
    margin-bottom: 50px;
    
`;

const ProfileContainer = styled.View`
    flex-direction: row;
    align-self: flex-start;
    background-color: ${({theme})=> theme.background};
    align-items:center;
    justify-content: center;
    margin-top: 30px;
`;

const ProfileButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    
`
const Username = styled.Text`
    font-size: 25px;
    margin-left: 40px;
    font-weight: bold;
`;

const LogoutContainer = styled.View`
    align-items: flex-end;
    justify-content: flex-start;
    margin-right: 20px;
`;

const Mypage_Store = ( {navigation} ) => {
    return (
        <Container>
            
            <InfoContainer>
                <ProfileContainer>
                <ProfileButton onPress={() => {
                    navigation.navigate("StoreInfo");
                }}>
                    <ProfileImage />
                </ProfileButton>
                <ProfileButton onPress={() => {
                    navigation.navigate("StoreInfo");
                }}>
                    <Username>업체 이름</Username>
                </ProfileButton>
                </ProfileContainer>
                <LogoutContainer>
                     <SmallButton title="로그아웃" onPress={ () => {} } containerStyle={{marginTop: 0}} />
                </LogoutContainer>
               
            </InfoContainer>
            
            <IconContainer>
                <MypageButton title='입찰내역' name='description' />
                <MypageButton title='업체관리' name='home-work' />
                <MypageButton title='리뷰관리' name='thumb-up' />
            </IconContainer>
            <IconContainer>
                <MypageButton title='로그분석' name='insert-chart' /> 
                <MypageButton title='채팅관리' name='chat' />
                <MypageButton title='즐겨찾기' name='star' />
            </IconContainer>
        </Container>
    );
};

export default Mypage_Store; 