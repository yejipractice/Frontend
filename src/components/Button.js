import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.TouchableOpacity`
    background-color: ${({theme,isFilled})=> isFilled? theme.buttonBackground : theme.buttonUnfilledBackground};
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    width: 100%;
    padding: 15px;
    opacity: ${({disabled}) => (disabled? 0.5 : 1)};
    margin-top: 25px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({theme, isFilled}) => isFilled? theme.buttonTextColor : theme.buttonUnfilledTitle };
    `;

const Button = ({containerStyle, title, onPress, isFilled, disabled}) => {
    return (
        <Container 
        style={containerStyle} 
        onPress={onPress} 
        isFilled={isFilled} 
        disabled={disabled}>
            <Title isFilled={isFilled}>{title}</Title>            
        </Container>
    );
};

Button.defaultProps ={
    isFilled: true,
};

Button.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
    disabled: PropTypes.bool,
};


export default Button;