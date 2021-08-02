import React, { useLayoutEffect, useState } from 'react';
import styled from "styled-components/native";
import { StyleSheet, Dimensions, TouchableOpacity, Alert} from "react-native";
import { Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BidstoreList } from '../utils/data';

const WIDTH = Dimensions.get("screen").width;

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
    padding: 10px 0 0 0;

`;

const Header = styled.View`
    width: ${WIDTH*0.98};
    height: 12%;
    background-color: ${({ theme }) => theme.background}; 
    flex-direction: row;
`;

const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    align-self: flex-start;
`;


const InfoContainer = styled.View`
    flex: ${({ flex }) => flex ? flex : 7};
    background-color: ${({ theme }) => theme.background}; 
    justify-content: center;
    alignItems: center;
    flex-direction:column;
    margin : 5%;
    border-radius: 10px;
    border: 1px solid black;
`;


const RowItemContainer = styled.View`
    padding: 5px 10px;
    flex-direction: column;
    border-bottom-width: ${({ border }) => border ? border : 1}px;
    border-color: ${({ theme }) => theme.label}
    width: 95%;
`;

const DescTitle = styled.Text`
    font-size: ${({ size }) => size ? size : 18}px;
    font-weight: bold;
    color: ${({ theme }) => theme.text}; 
    margin-top: 5px;

`;

const Desc = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.text}; 
    margin-top: 7px;
`;


const ButtonContainer = styled.View`
    flex-direction: row;
    flex: 1;
    margin : 15px;
    align-items: center;
    justify-content: center;

`;

const BidDetail = ({ navigation, route}) => {

    const [isUser, setIsUser] = useState(false);

    const _onMessagePress = () => { navigation.navigate("Message" , {name: "닉네임"+StoreId}) };
    
    const StoreId = route.params.id;
    const store = BidstoreList[StoreId-1] ; 

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerRight: () => (
                !isUser ?(<MaterialCommunityIcons name="send" size={35} onPress={_onMessagePress}
                    style={{ marginRight: 15, marginBottom: 3, marginTop: 3, opacity: 0.7 }} />) : null
            )
        });
    }, []);
    

    return (

        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}
                showsVerticalScrollIndicator={false}
            >
                <Header>
                    <TouchableOpacity style={styles.name}
                        onPress= {() => {navigation.navigate("StoreDetail",{id: StoreId})}}    
                    >
                        <Title>{store.name}</Title>
                    </TouchableOpacity>
                </Header>

                {/* 공고 조회에서 클릭시 데이터 연동 구현 필요 */}
                <InfoContainer>
                    <RowItemContainer>
                        <DescTitle>추천메뉴</DescTitle>
                        <Desc>{store.menu}</Desc>
                    </RowItemContainer>
                    <RowItemContainer>
                        <DescTitle>예상 가격대</DescTitle>
                        <Desc>{store.price}원</Desc>
                    </RowItemContainer>
                    <RowItemContainer>
                        <DescTitle>어필/설명</DescTitle>
                        <Desc>{store.detail}</Desc>
                    </RowItemContainer>
                </InfoContainer>

                
                 <ButtonContainer>
                 <Button
                     title="낙찰"
                     containerStyle={{ width: '100%' }}
                     onPress={() => {
                         Alert.alert(
                            "",
                            "낙찰하시겠습니까?",
                            [
                              { text: "확인", onPress: () => console.log("OK Pressed") },
                              {
                                text: "취소",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                            ]
                          );
                     }}
                 />
             </ButtonContainer>
                
            
            </KeyboardAwareScrollView>
        </Container>

    );
};

const styles = StyleSheet.create({
    name: {
        marginLeft: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 3,
    },
});



export default BidDetail;