import React from 'react';
import styled from "styled-components/native";
import { View,StyleSheet } from "react-native";
import PropTypes from "prop-types";


const ChangeContainer = styled.View`
    flex: 1; 
    alignItems: flex-end;
    justify-content: flex-end;
    margin-bottom: 5px;
    flex-direction: row;
`;

const ChangeText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: ${({theme})=> theme.titleColor};
    margin-right: 5px;
`;

const RowItemContainer = styled.View`
    padding: 5px 10px 15px;
    flex-direction: column;
    border-bottom-width: ${({ border }) => border ? border : 1}px;
    border-color: ${({ theme }) => theme.label};
    margin: 5px 0 5px 0;

`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
}))`
      width: ${({ width }) => width ? width : 85}%;
      background-color: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.text};
      padding: 10px 15px;
      font-size: 16px;
      border: 1px solid ${({ theme }) => theme.inputBorder};
      border-radius: 4px;
      margin-top: 10px;
  `;

const DescTitle = styled.Text`
    font-size: ${({ size }) => size ? size : 19}px;
    font-weight: bold;
    color: ${({ theme }) => theme.text}; 
`;

const Desc = styled.Text`
    margin: 2% 0 0 3%;
    font-size: 15px;
`;



const ManageText = ({name, label,TextChange,  onChangePress, 
value, onChangeText, placeholder, keyboardType, editable, onChange, isText,text}) => {
    return(
        <RowItemContainer>
            <View style={styles.row}>
                <DescTitle>{label}</DescTitle>
                {TextChange && 
                <ChangeContainer>
                    <ChangeText onPress={onChangePress}>변경</ChangeText>           
                </ChangeContainer> }
            </View>
            { isText ? 
             (<Desc>{text}</Desc>) : 
             (<StyledTextInput
                value={value}
                onChangeText={onChangeText ? onChangeText : text => onChange({ name, text })}
                placeholder={placeholder}
                returnKeyType="done"
                keyboardType={keyboardType}
                textContentType="none" // iOS only
                underlineColorAndroid="transparent" // Android only
                editable={editable}
            />)}
        </RowItemContainer>
    );
};

ManageText.propTypes = {
    name : PropTypes.string,
    label : PropTypes.string,
    TextChange : PropTypes.bool, 
    onCancelPress : PropTypes.func,
    onSavePress : PropTypes.func, 
    onChangePress : PropTypes.func,     
    isChanged : PropTypes.bool,
    value : PropTypes.string, 
    onChangeText : PropTypes.func, 
    placeholder : PropTypes.string, 
    keyboardType : PropTypes.string, 
    editable : PropTypes.bool, 
    onChange : PropTypes.func,

};

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: '25%',
        backgroundColor: 'white',
      },
      background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      row: {
        flexDirection:'row',
      }
});



export default ManageText; 