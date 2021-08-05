// 사용자/업체 모드 선택 페이지  
import React, {useState, useContext} from 'react';
import styled from "styled-components/native";
import {ModeButton} from "../../components";
import {LoginConsumer, LoginContext} from "../../contexts";

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: ${({theme}) => theme.titleColor};
    padding: 50px;
`;

const Mode = ({navigation}) => {
    const {setMode} = useContext(LoginContext);

    return (
        <Container>
            <Title>회식 모아</Title>
            <LoginConsumer>
            {({dispatch}) => (
            <>
            <ModeButton title= "User"
            onPress={() => {
            setMode('User');
            navigation.navigate("Signup",{ mode: 'User' });
            }}
            containerStyle={{marginBottom: 60}}
            />
            <ModeButton title= "Store"
            onPress={() => {
            setMode('Store');
            navigation.navigate("Signup",{ mode: 'Store' });
            }}/>
            </>
            )}
            </LoginConsumer>
        </Container>
    );
};

export default Mode;