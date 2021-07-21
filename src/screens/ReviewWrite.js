import React, {useState, useEffect} from 'react';
import styled from "styled-components/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Dimensions,Text,FlatList,View,ScrollView} from "react-native";
import { Button, SmallButton } from '../components';


const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;


const Container = styled.View`
    background-color: ${({ theme }) => theme.background};
    padding: 4%;
    flex: 1;
`;

const StarContainer = styled.View`
    flex-direction: row;    
    align-items: center;
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
}))`
    width: 100%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.inputBorder};
    margin-top: 5%;
    height: ${HEIGHT*0.3}px;
  `;

const ReviewImage = styled.Image`
    background-color:${({theme}) => theme.imageBackground};
    height: ${HEIGHT*0.12}px;
    width: ${HEIGHT*0.12}px;
`;




const Stars = ({onPress, setStar, star}) => {
    var list = [];
    let i = 0;

    const _onPress = i => {
        setStar(i);
    }

    for(i = 0; i<5; i++){

        if( i < star){
            list.push(
                <MaterialCommunityIcons key={i} name="star" size={40} color="#F2EC36"
                    setStar={setStar}
                    onPress={(e) => {_onPress(e.key)}}
            />)
        }
        else{
            list.push(
                <MaterialCommunityIcons key={i} name="star-outline" size={40} color="#F2EC36"
                    setStar={setStar}
                    onPress={(e) => {_onPress(e.key)}}
            />)
        }
    }
    //console.log(list);

    return list;
};

const ReviewImages = ( { item: { uri }}) => {
    return (
        <ReviewImage source={{uri : uri}}/>
    );
};


const ReviewWrite = ({navigation, route}) => {

    const [text, setText] = useState('');
    const [star, setStar] = useState(0);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (route.params.photos) {
            setPhotos(route.params.photos);
            console.log(route.params.photos);
        }
      }, [route.params.photos, photos]);



    const _onSavePress = () => {
        // 저장 완료 후 돌아가기
        navigation.navigate("UseManage");
    }

    const _onPhotoPress = () => {
        navigation.navigate("MultipleImage");
    }

    const _onStarPress = () => {
        console.log("console"+star);
    }

    return (
        <Container>
          
          <StarContainer>
                <Text style={{fontSize: 23, marginRight: '2%'}}>별점</Text>
                <Stars 
                    star = {star}
                    setStar = {setStar}
                    onPress = {_onStarPress}
                />
            </StarContainer>
            <StyledTextInput
                value={text}
                placeholder="리뷰를 남겨주세요."
                returnKeyType="done"
                maxLength={30}
                multiline
                textAlignVertical={'top'}
                textContentType="none" // iOS only
                underlineColorAndroid="transparent" // Android only
                onChangeText={text => setText(text)}

            />
            <SmallButton 
                title="사진첨부" 
                containerStyle ={{width: '25%', marginTop: '3%'}}
                onPress={_onPhotoPress}
            />

            {console.log(photos)}

            <ScrollView 
                style={{margin : '2%', height: HEIGHT*0.13, }} 
                contentContainerStyle={{paddingRight: 10, paddingLeft: 10, }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {photos.map(item =>
                <ReviewImage key={item.id} source={{uri : item.uri}} />
                )} 
            </ScrollView>

            <Button title="저장" onPress={_onSavePress}/>


        </Container>
    );
};

export default ReviewWrite;