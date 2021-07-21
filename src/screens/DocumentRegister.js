import React, {useState} from 'react';
import styled from "styled-components/native";
import {Image} from '../components';
import {Text, View} from 'react-native';
import {Dimensions} from "react-native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Container = styled.View`
background-color: ${({ theme }) => theme.background};
    flex: 1;
    padding: 6%;
`
const DocumentImage = styled.Image`
    margin-top: 3%;
    width: ${WIDTH*0.4}px;
    height: ${HEIGHT*0.3}px;
`;


const DocumentRegister = () => {

    const [document, setDocument] = useState('');

    return (
        <Container>
           <Image title="사진 첨부"
                    url={document}
                    onChangeImage={url => setDocument(url)}
                    containerStyle={{ width: '70%',}}
            />
            <View style={{borderBottomWidth: 0.5, marginTop: "4%",marginBottom: "4%"}}/>
            <DocumentImage source = {{uri: document}} />
            
        </Container>
    );
};

export default DocumentRegister;