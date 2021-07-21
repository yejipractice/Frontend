import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components/native";
import { View, StyleSheet } from "react-native";
import { ProfileImage, InfoText, Button } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { removeWhitespace, validatePassword } from "../utils/common";

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const InfoContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    margin-left: 40px;
`;

const CenterContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-bottom: 5%;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-top: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const StoreInfoChange = () => {
    // 임의로 설정, 연동 후 기존 설정값 등록
    const [Photo, setPhoto] = useState(null);
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const didMountRef = useRef();

    //에러 메세지 설정 
    useEffect(() => {
        if (didMountRef.current) {
            let _errorMessage = "";
            if (uploaded) {
                _errorMessage = "정보를 입력해주세요";
                if (!userName) {
                    _errorMessage = "닉네임을 입력하세요.";
                } else if (!password) {
                    _errorMessage = "비밀번호를 입력하세요.";
                } else if (!validatePassword(password)) {
                    _errorMessage = "비밀번호 조건을 확인하세요.";
                } else {
                    _errorMessage = "";
                }
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
        }
    }, [userName, password, uploaded]);

    const _handleChangeButtonPress = () => {
        setUploaded(true);
    };


    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}>

                <View style={{ marginTop: 30 }} ></View>

                <ProfileImage
                    url={Photo}
                    onChangeImage={url => setPhoto(url)}
                    showButton />

                <InfoContainer>
                    <InfoText
                        label="닉네임"
                        value={userName}
                        onChangeText={text => setuserName(text)}
                        placeholder="닉네임"
                        returnKeyType="done"
                        isChanged

                    />
                    <InfoText label="이메일" content="이메일주소" />
                    <InfoText
                        label="비밀번호"
                        value={password}
                        onChangeText={text => setPassword(removeWhitespace(text))}
                        placeholder="특문, 숫자, 영문 포함 8자-16자"
                        returnKeyType="done"
                        isChanged
                        isPassword

                    />
                    <ErrorText>{errorMessage}</ErrorText>
                </InfoContainer>

                <CenterContainer>
                    {/* 변경사항 서버 저장 */}
                    <Button
                        containerStyle={{ width: '50%', }}
                        title="저장"
                        onPress={_handleChangeButtonPress}
                    />
                </CenterContainer>

            </KeyboardAwareScrollView>

        </Container>
    );
};

export default StoreInfoChange;
