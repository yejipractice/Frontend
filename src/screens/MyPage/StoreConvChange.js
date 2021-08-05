import React, { useState,useEffect,useRef, useLayoutEffect } from 'react';
import styled from "styled-components/native";
import { Dimensions, View, StyleSheet } from "react-native";
import { RadioButton,ToggleButton } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HEIGHT = Dimensions.get("screen").width;

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    padding: 10px;
`;

const InfoContainer = styled.View`
    background-color: ${({ theme }) => theme.background}; 
    margin: 15px;
    padding: 10px;
    border-radius: 6px;
    border: 0.7px solid black;
`;

const RowItemContainer = styled.View`
    padding: 5px 10px 15px;
    flex-direction: column;
    border-bottom-width: ${({ border }) => border ? border : 1}px;
    border-color: ${({ theme }) => theme.label};
    margin: 5px 0 5px 0;
`;

const DescTitle = styled.Text`
    font-size: ${({ size }) => size ? size : 19}px;
    font-weight: bold;
    color: ${({ theme }) => theme.text}; 
`;

const ToggleContainer = styled.View`
    flex: 1; 
    align-items: flex-end;
    justify-content: flex-end;
    align-self: flex-end;
    margin-bottom: 5px;
    flex-direction: row;
    width: 22%;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
`;

const ButtonBox = styled.TouchableOpacity`
    background-color: ${({theme, checked})=> checked? theme.titleColor :theme.storeButton};
    width: ${({width})=> width? width : 30}%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: ${HEIGHT*0.075}
`;

const ButtonText = styled.Text`
    font-size: 15px;
`;



const StoreConvChange = ({ navigation, route }) => {

    const [isParking, setIsParking] = useState(false);
    const [isParkingFree, setIsParkingFree] = useState(true);
    const [isValet, setISValet] = useState(false);

    // 기타시설

    const [room, setRoom] = useState(false); // 룸
    const [groupseat, setGroupseat] = useState(false); // 단체석
    const [sedentary, setSedentary ] = useState(false); // 좌식
    const [internet, setInternet] = useState(false); // 무선인터넷
    const [highchair, setHighchair] = useState(false); // 유아용 의자
    const [handicap, setHandicap] = useState(false); // 장애인 편의시설
    const [pet, setPet] = useState(false); // 반려동물
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons name="check" size={35} onPress={_onConvPress}
                    style={{ marginRight: 10, marginBottom: 3 }} />
            )
        });
    });

    // 편의정보 수정
    const _onConvPress = () => {      
        navigation.navigate("Mypage_Store");
    };

    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}
            >   
                {/* 업체 편의정보 */}
                <View style={{marginLeft: 10}}>
                    <DescTitle size={23}>업체 편의정보</DescTitle>
                </View>
                
                <InfoContainer>
                    {/* 주차 */}
                    <RowItemContainer>
                        <DescTitle>주차</DescTitle>
                        
                        <ToggleContainer>
                            <ToggleButton
                                label="설정"
                                value={isParking}
                                onValueChange={() => setIsParking(previousState => !previousState)}/>
                        </ToggleContainer>
                        { isParking &&
                            <View style={styles.row}>
                                <RadioButton 
                                    label="무료"
                                    status={(isParkingFree === true ? "checked" : "unchecked" )}
                                    containerStyle={{marginBottom:0, marginLeft: 0, marginRight: 0}}
                                    onPress={() => setIsParkingFree(true)}
                                />
                                <RadioButton 
                                    label="유료"
                                    status={(isParkingFree === false ? "checked" : "unchecked" )}
                                    containerStyle={{marginBottom:0, marginLeft: 0, marginRight: 0}}
                                    onPress={() => setIsParkingFree(false)}
                                />              
                            </View>}

                    </RowItemContainer>
                    {/* 발렛파킹 */}
                    <RowItemContainer>
                        <DescTitle>발렛파킹</DescTitle>
                        <ToggleContainer>
                            <ToggleButton
                                label="설정"
                                value={isValet}
                                onValueChange={() => setISValet(previousState => !previousState)}/>
                        </ToggleContainer>
                    </RowItemContainer>

                    {/* 기타시설 */}
                    <RowItemContainer>
                        <DescTitle>기타시설</DescTitle>
                        <ButtonContainer> 
                        <ButtonBox onPress={() =>{setRoom(previousState => !previousState)}} checked={room} width={15}>
                            <ButtonText>룸</ButtonText>
                        </ButtonBox>
                        <ButtonBox onPress={() =>{setGroupseat(previousState => !previousState)}} checked={groupseat} width={25}>
                            <ButtonText>단체석</ButtonText>
                        </ButtonBox>
                        <ButtonBox onPress={() =>{setSedentary(previousState => !previousState)}} checked={sedentary} width={20}>
                            <ButtonText>좌식</ButtonText>
                        </ButtonBox>  
                        <ButtonBox onPress={() =>{setInternet(previousState => !previousState)}} checked={internet}>
                            <ButtonText>무선인터넷</ButtonText>
                        </ButtonBox>
                        </ButtonContainer>
                        <ButtonContainer>
                        <ButtonBox onPress={() =>{setHighchair(previousState => !previousState)}} checked={highchair}>
                            <ButtonText>유아용 의자</ButtonText>
                        </ButtonBox>

                        <ButtonBox onPress={() =>{setHandicap(previousState => !previousState)}} checked={handicap} width={40}>
                            <ButtonText>장애인 편의시설</ButtonText>
                        </ButtonBox>
                        <ButtonBox onPress={() =>{setPet(previousState => !previousState)}} checked={pet} width={25}>
                            <ButtonText>반려동물</ButtonText>
                        </ButtonBox>
                        </ButtonContainer>
                    </RowItemContainer>


                </InfoContainer>
            </KeyboardAwareScrollView>
        </Container>

    );
};

const styles = StyleSheet.create({
      row: {
        flexDirection:'row',
        marginRight: '50%'
      }
});

export default StoreConvChange;