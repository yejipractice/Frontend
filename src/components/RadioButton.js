import React,{useContext} from 'react';
import styled,{ThemeContext} from "styled-components/native";
import PropTypes from "prop-types";
import { RadioButton } from 'react-native-paper';

const Container = styled.View`
  flex-direction: row;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  `;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.text};
`;


const Button = ({ label, value, status, onPress, containerStyle }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container style={containerStyle}>
      <Label>{label}</Label>
      <RadioButton
        value={value}
        status={status}
        onPress={onPress}
        color={theme.titleColor}
     />
    </Container>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.bool,
  status: PropTypes.string,
  containerStyle: PropTypes.object,
};

export default Button;

