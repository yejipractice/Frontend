import React, {useState, useContext, useEffect} from 'react';
import styled, {ThemeContext} from "styled-components/native";
import {Text, Dimensions, FlatList} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {AuctionList} from "../utils/data";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {LoginContext, UrlContext, ProgressContext} from "../contexts";

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
    padding-left: 1%;
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

const changeDateData = (date) =>{
    var y = date.slice(0,4);
    var m = date.slice(5,7);
    var d = date.slice(8,10);
    var h = date.slice(11,13);
    var min = date.slice(14,16);
    return y+"/"+m+"/"+d+" "+h+":"+min;
} 

const changeEndDateData = (date) => {
    var now = new Date().toJSON();
    var now_y = now.slice(0,4);
    var now_m = now.slice(5,7);
    var now_d = now.slice(8,10);
    var now_h = now.slice(11,13);
    var now_min = now.slice(14,16); 
    var y = date.slice(0,4);
    var m = date.slice(5,7);
    var d = date.slice(8,10);
    var h = date.slice(11,13);
    var min = date.slice(14,16);
    var yy = y - now_y;

    var res = "";
    if (yy > 0){
        if (m == now_m){
            res = "약 "+yy+"년 ";
        }else if (m > now_m){
            var mm = m - now_m;
            res = "약 "+yy+"년 "+mm+"달";
        }else {
            var mm = now_m - m;
            res = "약 "+(yy-1)+"년 "+mm+"달";
        }
    }else if(m - now_m > 0){
        res = "약 "+(m-now_m)+"달";
    }else if(d - now_d){
        res = "약 "+(d-now_d)+"일";
    }else if(h - now_h > 0){
        res = "약 "+ (h-now_h) +"시간";
    }else {
        res = "약 "+ (min-now_min) +"분";
    }

    return res;
};

const changeListData = (list) => {
    var sliced = list.slice(1,list.length-1);
    var changed = sliced.replace(/"/gim, "");
    var completed = changed.replace(/,/gim, ", ");
    return completed;
};

const Item = ({item: {auctionId, auctioneers, content, createdData, deadline, maxPrice, minPrice, reservation, status, storeType, title, updatedDate, useName, userType}, onPress, onStarPress, isStar}) => {
    return (
        <ItemContainer onPress={onPress} >
            <TimeTextContiner>
                <ContentText>{changeDateData(reservation)} 예약</ContentText>
                <ContentText>마감 {changeEndDateData(deadline)} 전</ContentText>
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
                <ContentText>단체 유형: {userType} (0명)</ContentText>
                <ContentText>선호 지역: 지역</ContentText>
                <ContentText>선호 메뉴: {changeListData(storeType)}</ContentText>
                <ContentText style={{marginBottom: 10}}>선호 가격대: {minPrice}원 ~ {maxPrice}원</ContentText>
                <ContentText style={{position: "absolute", right: 5, bottom: 0}}>{changeDateData(updatedDate)} 등록</ContentText>
            </ItemBox>
        </ItemContainer>
    );
};


const Auction = ({navigation}) => {
    const theme = useContext(ThemeContext);
    const {token} = useContext(LoginContext);
    const {aurl} = useContext(UrlContext);
    const {spinner} = useContext(ProgressContext);

    const [isStar, setIsStar] = useState(false);
    const [auctionListData, setAuctionListData] = useState([]);

    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState(null);
    const [list1, setList1] = useState([
        {label: "최신순", value: "최신순"},
        {label: "마감순", value: "마감순"},
    ]);

    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState(null);
    const [list2, setList2] = useState([
        {label: "전체", value: "전체"},
        {label: "한식", value: "한식"},
        {label: "중식", value: "중식"},
        {label: "양식", value: "양식"},
        {label: "일식", value: "일식"},
        {label: "기타", value: "기타"},
    ]);

    // 시도로 범위를 크게 vs 시도별 시군구까지 => api ? 
    const [open3, setOpen3] = useState(false);
    const [selected3, setSelected3] = useState(null);
    const [list3, setList3] = useState([
        {label: "서울특별시", value: "정렬기준1"},
        {label: "부산광역시", value: "정렬기준2"},
        {label: "대구광역시", value: "정렬기준3"}
    ]);

    const handleApi = async () => {
        let fixedUrl = aurl+"/auction/auctions";

        let options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN' : token,
            },
        };

        try {
            spinner.start();
            let response = await fetch(fixedUrl, options);
            let res = await response.json();
            setAuctionListData(res["list"]);
        }catch(error) {
            console.error(error);
        }finally {
            spinner.stop();
        }
    };

    const cutDateData = (date) => {
        var a = date.slice(0,4)
        var b = date.slice(5,7)
        var c = date.slice(8,10)
        var d =  date.slice(11,13)
        var e = date.slice(14,16);
        return a+b+c+d+e;
    };

    const filterDataList = (data) => {
        var now = new Date().toJSON();
        var nowdata = cutDateData(changeDateData(now));
        
        let res = data.filter((item) => cutDateData(changeDateData(item.deadline)) > nowdata);
        return res;
    };

    useEffect(()=> {
        handleApi();
    }, []);

    useEffect(()=> {
        //data 정렬
    }, [selected1, selected2, selected3]);

    const _onAuctionPress = item => {navigation.navigate("AuctionDetail",{id: item['auctionId']})};

    const _onStarPress = () => { setIsStar(!isStar) };

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
                placeholder="정렬"
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
                placeholder="메뉴"
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
                placeholder="지역"
                placeholderStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                listMode="SCROLLVIEW" 
                style={{height: WIDTH*0.1}}/>

        <AuctionsContainer>
            <FlatList
            horizontal={false}
            keyExtractor={item => item['auctionId'].toString()}
            data={filterDataList(auctionListData)} 
            renderItem={({item}) => (
                <Item item={item} onPress={()=> _onAuctionPress(item)} onStarPress={_onStarPress} isStar={isStar}/>
            )}/>
        </AuctionsContainer>

        </Container>
    );
};

export default Auction; 