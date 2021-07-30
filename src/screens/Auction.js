import React, {useState, useContext, useEffect} from 'react';
import styled, {ThemeContext} from "styled-components/native";
import {Dimensions, ScrollView} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {LoginContext, UrlContext, ProgressContext} from "../contexts";
import {changeDateData, changeEndDateData, changeListData, cutDateData} from "../utils/common";
import {Spinner} from "../components";


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

const ButtonContainer = styled.TouchableOpacity`
    position: absolute;
    bottom: 3%;
    right: 5%;
    justify-content: center;
    align-items: center;
    `;

const Item = React.memo(({item: {auctionId, auctioneers, content, createdDate, deadline, maxPrice, minPrice, reservation, status, storeType, title, updatedDate, userName, groupType, groupCnt, addr, age, gender}, onPress, onStarPress, isStar}) => {
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
                <ContentText>단체 유형: {groupType} ({groupCnt}명)</ContentText>
                <ContentText>선호 지역: {addr}</ContentText>
                <ContentText>선호 메뉴: {changeListData(storeType)}</ContentText>
                <ContentText style={{marginBottom: 10}}>선호 가격대: {minPrice}원 ~ {maxPrice}원</ContentText>
                <ContentText style={{position: "absolute", right: 5, bottom: 0}}>{changeDateData(createdDate)} 등록</ContentText> 
            </ItemBox>
        </ItemContainer>
    );
});


const Auction = ({navigation}) => {
    const theme = useContext(ThemeContext);
    const {token} = useContext(LoginContext);
    const {aurl} = useContext(UrlContext);
    const {spinner} = useContext(ProgressContext);

    const [isStar, setIsStar] = useState(false);
    const [auctionListData, setAuctionListData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

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

    const filterDataList = (data) => {
        var now = new Date().toJSON();
        var nowdata = cutDateData(changeDateData(now));
        
        let res = data.filter((item) => cutDateData(changeDateData(item.deadline)) > nowdata);
        return res;
    };

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
            var list = filterDataList(res["list"]);
            setAuctionListData(list);
        }catch(error) {
            console.error(error);
        }finally {
            spinner.stop();
        }
    };


    const _setLatestAuctionList = (prev) => {
        var res = prev.sort(function (a,b){
            return Number(cutDateData(b.createdDate)) - Number(cutDateData(a.createdDate));
        });
        return res;
    };

    const _setHurryingAuctionList = (prev) => {
        var res = prev.sort(function (a,b){
            return Number(cutDateData(a.deadline)) - Number(cutDateData(b.deadline));
        });
        return res;
    };

    useEffect(()=> {
        handleApi();
    }, []);

    useEffect(()=> {
        setIsLoading(false)
    },[isChanged]);

    useEffect(()=> {
        //data 정렬
        let prev = auctionListData;
        if(selected1==="마감순"){
            setIsLoading(true);
            var list = _setHurryingAuctionList(prev);
            setAuctionListData(list);
        }else if(selected1==="최신순"){
            setIsLoading(true);
            var list = _setLatestAuctionList(prev);
            setAuctionListData(list);
        }
        setIsChanged(!isChanged);
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
                maxHeight={WIDTH*0.2}
                onChangeValue={() => setIsLoading(true)}
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
                style={{height: WIDTH*0.1}}
                maxHeight={WIDTH*0.2}/>

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
                style={{height: WIDTH*0.1}}
                maxHeight={WIDTH*0.2}/>

        <AuctionsContainer>
            {!isLoading &&
                <ScrollView>
                {auctionListData.map(item => (<Item item={item} key={item.auctionId} onPress={_onAuctionPress} onStarPress={_onStarPress} isStar={isStar}/>))}
            </ScrollView>}
        </AuctionsContainer>
        <ButtonContainer>
            <MaterialCommunityIcons name="refresh-circle" size={65} onPress={handleApi} color={theme.titleColor}/>
        </ButtonContainer>
        {isLoading && <Spinner />}
        </Container>
    );
};

export default Auction; 