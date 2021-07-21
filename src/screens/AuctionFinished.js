import React, {useState, useContext} from 'react';
import styled, {ThemeContext} from "styled-components/native";
import {Text, Dimensions, FlatList} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {AuctionList} from "../utils/data";

const WIDTH = Dimensions.get("screen").width; 



const AuctionsContainer = styled.View`
    flex: 1;
    width: 95%;
    margin-top: ${WIDTH*0.15}
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
    color: ${({theme})=> theme.text};
`;

const ItemBox = styled.View`
    border-radius: 1px;
    padding: 10px 8px;
    border-radius: 10px;
    background-color: ${({theme})=> theme.opacityTextColor};
`;

const Item = ({item: {id, title, type, count, region, preMenu, prePrice, bookTime, registerTime}, onPress}) => {
    return (
        <ItemContainer onPress={onPress} >
            <TimeTextContiner>
                <ContentText>{bookTime}</ContentText>
            </TimeTextContiner>
            <ItemBox>
                <ContentTitleText>{title}</ContentTitleText>
                <ContentText>단체 유형: {type}({count}명)</ContentText>
                <ContentText>선호 지역: {region}</ContentText>
                <ContentText>선호 메뉴: {preMenu}</ContentText>
                <ContentText>선호 가격대: {prePrice}</ContentText>
                <ContentText style={{position: "absolute", right: 5, bottom: 0}}>{registerTime}</ContentText>
            </ItemBox>
        </ItemContainer>
    );
};

const Auction = ({navigation, route}) => {
    const theme = useContext(ThemeContext);

    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState(null);
    const [list1, setList1] = useState([
        {label: "정렬기준1", value: "정렬기준1"},
        {label: "정렬기준2", value: "정렬기준2"},
        {label: "정렬기준3", value: "정렬기준3"}
    ]);

    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState(null);
    const [list2, setList2] = useState([
        {label: "정렬기준1", value: "정렬기준1"},
        {label: "정렬기준2", value: "정렬기준2"},
        {label: "정렬기준3", value: "정렬기준3"}
    ]);

    const [open3, setOpen3] = useState(false);
    const [selected3, setSelected3] = useState(null);
    const [list3, setList3] = useState([
        {label: "정렬기준1", value: "정렬기준1"},
        {label: "정렬기준2", value: "정렬기준2"},
        {label: "정렬기준3", value: "정렬기준3"}
    ]);

    const _onAuctionPress = item => {
        navigation.navigate("AuctionDetail",{id: item['id']});
    };
    return (
        <Container>
            
                <DropDownPicker
                open={open1}
                value={selected1}
                items={list1}
                setOpen={setOpen1}
                setValue={setSelected1}
                setItems={setList1}
                containerStyle={{width: WIDTH*0.28, position: "absolute", left: 5, top: 10,}}
                textStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                placeholder="정렬1"
                placeholderStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                listMode="SCROLLVIEW" 
                style={{height: WIDTH*0.1}}
                />

                <DropDownPicker
                open={open2}
                value={selected2}
                items={list2}
                setOpen={setOpen2}
                setValue={setSelected2}
                setItems={setList2}
                textStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                containerStyle={{width: WIDTH*0.28, position: "absolute", marginLeft: WIDTH*0.36, top: 10}}
                placeholder="정렬2"
                placeholderStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                listMode="SCROLLVIEW" 
                style={{height: WIDTH*0.1}}/>

                <DropDownPicker 
                open={open3}
                value={selected3}
                items={list3}
                setOpen={setOpen3}
                setValue={setSelected3}
                setItems={setList3}
                textStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                containerStyle={{width: WIDTH*0.28, position: "absolute", right: 5, top: 10}}
                placeholder="정렬3"
                placeholderStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                listMode="SCROLLVIEW" 
                style={{height: WIDTH*0.1}}/>

        <AuctionsContainer>
            <FlatList
            horizontal={false}
            keyExtractor={item => item['id'].toString()}
            data={AuctionList} 
            renderItem={({item}) => (
                <Item item={item} onPress={()=> _onAuctionPress(item)} />
            )}/>
        </AuctionsContainer>

        </Container>
    );
};

export default Auction; 