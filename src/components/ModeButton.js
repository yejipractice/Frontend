// 업체/사용자 모드 선택 버튼 

import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.TouchableOpacity`
    background-color: ${({theme})=> theme.userButton};
    align-items: center;
    border-radius: 4px;
    width: 60%;
    height: 25%;
    padding: 10px;
    justify-content: center;
`;

const Title = styled.Text`
    color: ${({theme})=> theme.buttonTextColor};
    font-size: 28px;
    font-weight: bold;
    align-self: center;
`;

//Container(버튼 container), Title(버튼 속 내용: 업체 or 사용자)
const ModeButton = ({title, onPress, containerStyle}) => {
    return (
        <Container style={containerStyle} title={title} onPress={onPress}>
            <Title>{title==="Store"? "업체" : "사용자"}</Title>
        </Container>
    );
};

ModeButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    containerStyle: PropTypes.object,
};

export default ModeButton;