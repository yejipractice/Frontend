import React, {useState, useEffect, useContext} from 'react';
import styled from "styled-components/native";
import {Dimensions, View, ScrollView, Alert} from "react-native";
import { ThemeContext } from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import {LoginContext, UrlContext, ProgressContext} from "../../contexts";

const HEIGHT = Dimensions.get("screen").width;

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
`;

const StoresConteinter = styled.View`
    flex: 1;
    margin-top: 20px;
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
`;

const AdditionalBox = styled.View`
    height: ${HEIGHT*0.2};
`;

const ButtonBox = styled.TouchableOpacity`
    background-color: ${({theme, checked})=> checked? theme.titleColor :theme.storeButton};
    width: 30%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: ${HEIGHT*0.075}
`;

const ButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-self: center;
    width: 90%;
    margin-bottom: 10px;
    padding: 10px;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.text};
`;

// const StyledImage = styled.Image`
//     background-color:${({ theme }) => theme.imageBackground};
//     height: 80;
//     width: 80;
//     border-radius: 50px;
// `;

const StyledImage = styled.View`
    background-color:${({ theme }) => theme.imageBackground};
    height: 80;
    width: 80;
    border-radius: 50px;
`;

const ContentContainter = styled.View`
    padding: 0px 10px;
    justify-content: center;
`;

const ContentTitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color:${({ theme }) => theme.text};
`;

const ContentText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color:${({ theme }) => theme.opacityTextColor};
`;

const StarBox = styled.View`
    position: absolute;
    right: 5px;
    top: 5px;
`;

const ScoreBox = styled.View`
    position: absolute;
    right: 5px;
    bottom: 5px;
    align-items: center;
    padding: 2px 5px;
    background-color:${({ theme }) => theme.titleColor};
    flex-direction: row;
    border-radius: 50px;
`;

const ScoreText = styled.Text`
    font-size: 13px;
    font-weight: bold;
    color:${({ theme }) => theme.background};
`;

const MapButton = styled.TouchableOpacity`
    background-color:${({ theme }) => theme.mapButtonColor};
    padding: 15px 15px;
    border-radius: 30px;
`;

const MapText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color:${({ theme }) => theme.background};
`;

const Item = ({item: {id, name, storeImages, storeType}, onPress, onStarPress, isStar, theme}) => {
    const {mode} = useContext(LoginContext);
    
    return (
        <ItemContainer onPress={onPress} >
            {/* <StyledImage source={{uri: url}}/> */}
            <StyledImage />
            <ContentContainter>
                <ContentTitleText>{name}</ContentTitleText>
                <ContentText>0M</ContentText>
            </ContentContainter>
            {mode ==="CUSTOMER" && 
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
            </StarBox>}
            <ScoreBox>
                <MaterialCommunityIcons name="star" size={15} color={theme.background}/>
                <ScoreText>5</ScoreText>
            </ScoreBox>
        </ItemContainer>
    );
};

const Store = ({navigation, route}) => {
    const theme = useContext(ThemeContext);
    const {allow, token, mode} = useContext(LoginContext);
    const {url} = useContext(UrlContext);
    const {spinner} = useContext(ProgressContext);

    const [sort,setSort] = useState(0);
    const [isStar, setIsStar] = useState(false);
    const [loc, setLoc] = useState(null);
    const [lati, setLati] = useState(null);
    const [longi, setLongi] = useState(null);
    const menu = route.name;
    const [storeListData, setStoreListData] = useState([]);
    const [allowLoc, setAllowLoc] = useState(allow);
    const [isSetting, setIsSetting] = useState(true);

    const _getLocPer = async () => {
        try{
            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status === "granted"){
                setAllow(true);
                setAllowLoc(true);
            };
        }catch (e) {
            console.log(e);
        };
      };

    const filterData = (list) => {
        var response = list.filter(item => item.documentChecked===true);
        var res = response.filter(item => item.addr!==null);
        return res;
    };


    const handleApi = async () => {
        let fixedUrl = url+"/member/stores";

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
            let list = res["list"];
            list = await filterData(list);
            setStoreListData(list);
            getLocation();
        }catch(error) {
            console.error(error);
        }finally {
            spinner.stop();
        }
    };

    useEffect(()=> {
        if(!allowLoc){
            _getLocPer();
        }else {
            handleApi();
        }
    },[allowLoc]);

    useEffect(()=> {
        if(lati!==null && longi!==null){
            setIsSetting(false);
        }
    },[lati, longi]);


    useEffect(()=> {
        // data 정렬 
    }, [sort, menu]);

    const _onStorePress = item => {
        navigation.navigate('StoreDetailStack', { id: item.id});
    };
    const _onStarPress = () => {setIsStar(!isStar);}

    const getLocation = async () => {
            try{
                spinner.start();
                let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High}); 
                setLoc(location);
                setLati(location.coords.latitude);
                setLongi(location.coords.longitude);
            }catch(e){
                console.error(e);
            }finally{
                spinner.stop();
            }
            
        return loc;
    };

    return (
        <Container>
            <ButtonsContainer>
                <ButtonBox onPress={() => setSort(1)} checked={sort===1}>
                    <ButtonText>거리순</ButtonText>
                </ButtonBox>
                <ButtonBox onPress={() => setSort(2)} checked={sort===2}>
                    <ButtonText>별점순</ButtonText>
                </ButtonBox>
                <ButtonBox onPress={() => setSort(3)} checked={sort===3}>
                    <ButtonText>리뷰순</ButtonText>
                </ButtonBox>
            </ButtonsContainer>
            
            <ScrollView>
            <StoresConteinter>
                {storeListData.map(item => (<Item item={item} key={item.id} onPress={()=> _onStorePress(item)} onStarPress={_onStarPress} isStar={isStar} theme={theme}/>))}
            </StoresConteinter>
            <AdditionalBox />
            </ScrollView>
            <View style={{
                position: "absolute",
                bottom: 10,
                right: 5,
            }}>
            {!isSetting && (
                <MapButton 
                onPress={()=> {
                        navigation.navigate("StoreMap", {longi: longi, lati: lati});
            }}>
                <MapText>지도로 보기</MapText>
            </MapButton>
            )}
            
            </View>
        </Container>
    );
};

export default Store; 