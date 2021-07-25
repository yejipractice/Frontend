import React, {useContext} from 'react';
import styled from "styled-components/native";
import { MypageButton, ProfileImage, SmallButton } from '../components'
import {LoginContext} from "../contexts";
import {Alert} from 'react-native';


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

const Mypage_User = ( {navigation} ) => {

    // 로그인 성공 여부
    const {setSuccess} = useContext(LoginContext);

    return (
        <Container>
            
            <InfoContainer>
                <ProfileContainer>
                <ProfileButton onPress={() => {
                    navigation.navigate("UserInfo");
                }}>
                    <ProfileImage />
                </ProfileButton>
                <ProfileButton onPress={() => {
                    navigation.navigate("UserInfo");
                }}>
                    <Username>사용자 이름</Username>
                </ProfileButton>
                </ProfileContainer>

                <LogoutContainer>
                    <SmallButton title="로그아웃" containerStyle={{marginTop: 0}} 
                        onPress={()=>{
                            Alert.alert(
                                "", "로그아웃하시겠습니까?",
                                [
                                    { text: "확인", onPress: () => setSuccess(false) },
                                    {
                                      text: "취소",
                                      style: "cancel"
                                    },
                                  ]
                              );
                            
                        }}
                    />
                </LogoutContainer>
                
                
            </InfoContainer>
            
            <IconContainer>
                <MypageButton title='이용내역' name='list-alt'   
                    onPress={() => {
                        navigation.navigate("UseManage");
                }} />
                <MypageButton title='리뷰관리' name='thumb-up'   
                    onPress={() => {
                        navigation.navigate("ReviewManage",{ isUser: true });
                }}/>
                <MypageButton title='공고관리' name='description'
                    onPress={() => {
                        navigation.navigate("BidManageTab", { isUser: true });
                }}  />
            </IconContainer>
            <IconContainer>
                <MypageButton title='결제관리' name='payment'   
                    onPress={() => {
                        navigation.navigate("PayManage");
                }} /> 
                <MypageButton title='채팅관리' name='chat'  
                    onPress={() => {
                        navigation.navigate("ChatManage");
                }}/>
                <MypageButton title='즐겨찾기' name='star'  
                    onPress={() => {
                        navigation.navigate("Bookmark",{ isUser: true });
                }}/>
            </IconContainer>
        </Container>
    );
};

export default Mypage_User; 