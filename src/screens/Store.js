import React, {useState, useEffect} from 'react';
import styled from "styled-components/native";
import {Text} from "react-native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.background};
`;

const ButtonContainer = styled.TouchableOpacity`

`;

const Store = () => {
    const [data, setData] = useState("");
    const [res, setRes] = useState('Store Screen');

    const handleApi = async () => {
        const response = await fetch("http://172.16.101.137:51166/member/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                email: "email",
                password: "password"
            }});
            
        const res = await response.json();
        return res;       
    };

    const _onPress = () => {
        handleApi().then((res) => console.log(res));
    };
    
    return (
        <Container>
            <ButtonContainer onPress={_onPress}>
                <Text style={{fontSize: 30}}>{res}</Text>
            </ButtonContainer>
          
        </Container>
    );
};

export default Store; 