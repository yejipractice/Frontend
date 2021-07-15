import React from 'react';
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
`
const Text = styled.Text`
    font-size: 15px;
`;

const StoreManage = () => {
    return (
        <Container>
           <Text>Store Manage</Text> 
        </Container>
    );
};

export default StoreManage;