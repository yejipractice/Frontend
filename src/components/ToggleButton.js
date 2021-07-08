import React,{useContext} from "react";
import { Switch } from "react-native";
import styled,{ThemeContext} from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 7px 0;
  align-items: center;
`;
const Label = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-top: 3px;
  margin-right: 5%;
`;
 
const ToggleButton = ({label, value, onValueChange}) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Label>{label}</Label>
      <Switch
        trackColor={{  false: "rgba(73,76,80,0.5)", true: "rgba(0,149,255,0.5)" }}
        thumbColor={theme.titleColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.3 }] }}
      />
    </Container>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};


export default ToggleButton;