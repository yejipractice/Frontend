import React, {useState, useContext} from 'react';
import styled, {ThemeContext} from "styled-components/native";
import {Text, Dimensions, FlatList} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {AuctionList} from "../utils/data";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const WIDTH = Dimensions.get("screen").width; 

const AuctionsContainer = styled.View`
    flex: 1;
    width: 95%;
`;

const Container = styled.View`
    flex: 1;
    justify-content: space-around;
    align-items: center;
    padding: 1% 0;
    background-color: ${({theme})=> theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
    align-self: center;
    width: 95%;
    margin-bottom: 10px;
`;

const TimeTextContiner = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ContentTitleText = styled.Text`
    font-size: 20px;
    color: ${({theme})=> theme.text};
    margin-bottom: 5px;
`;

const ContentText = styled.Text`
    font-size: 15px;
    color: ${({theme})=> theme.opacityTextColor};
`;

const ItemBox = styled.View`
    border-radius: 1px;
    padding: 10px 8px;
    border-radius: 10px;
    border-width: 1px;
`;

const StarBox = styled.View`
    position: absolute;
    right: 5px;
    top: 5px;
`;

const Item = ({item: {id, title, type, count, region, preMenu, prePrice, bookTime, registerTime}, onPress, onStarPress, isStar}) => {
    return (
        <ItemContainer onPress={onPress} >
            <TimeTextContiner>
                <ContentText>{bookTime}</ContentText>
                <ContentText>마감 N분전</ContentText>
            </TimeTextContiner>
            <ItemBox>
                <ContentTitleText>{title}</ContentTitleText>
                <StarBox>
                {isStar ?
                            (
                                <MaterialCommunityIcons name="star" size={40} onPress={onStarPress} color="yellow"
                                    style={{ marginLeft: 15, marginBottom: 5, opacity: 0.7 }} />
                            )
                            : (
                                <MaterialCommunityIcons name="star-outline" size={40} onPress={onStarPress} color="yellow"
                                    style={{ marginLeft: 15, marginBottom: 5, opacity: 0.7 }} />
                            )}
                </StarBox>
                <ContentText>단체 유형: {type}({count}명)</ContentText>
                <ContentText>선호 지역: {region}</ContentText>
                <ContentText>선호 메뉴: {preMenu}</ContentText>
                <ContentText>선호 가격대: {prePrice}</ContentText>
                <ContentText style={{position: "absolute", right: 5, bottom: 0}}>{registerTime}</ContentText>
            </ItemBox>
        </ItemContainer>
    );
};

const SearchAuction = ({navigation}) => {
    const theme = useContext(ThemeContext);

    const [isStar, setIsStar] = useState(false);

    const _onAuctionPress = item => {navigation.navigate("AuctionDetail",{id: item['id']})};

    const _onStarPress = () => { setIsStar(!isStar) };

    return (
        <Container>
        <AuctionsContainer>
            <FlatList
            horizontal={false}
            keyExtractor={item => item['id'].toString()}
            data={AuctionList} 
            renderItem={({item}) => (
                <Item item={item} onPress={()=> _onAuctionPress(item)} onStarPress={_onStarPress} isStar={isStar}/>
            )}/>
        </AuctionsContainer>

        </Container>
    );
};

export default SearchAuction; 