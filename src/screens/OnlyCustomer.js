import React from 'react';
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme}) => theme.background};
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text`
    font-size: 30px;
`;

const OnlyCustomer = () => {
    return (
        <Container>
            <Text>ONLY CUSTOMER</Text>
        </Container>
    );
};

export default OnlyCustomer;