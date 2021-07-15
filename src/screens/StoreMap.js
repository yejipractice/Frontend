import React,{useEffect, useState, useContext} from 'react';
import styled, {ThemeContext} from "styled-components/native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {Dimensions, ScrollView, FlatList} from "react-native";
import * as Location from "expo-location";
import {StoreList} from "../utils/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.titleColor}
`;

const Memus = [{id: 0, name:"전체"}, {id: 1, name:"한식"}, {id: 2, name:"중식"},
{id: 3, name:"양식"}, {id: 4, name:"일식"}, {id: 5, name:"기타"}];

const ButtonContainer = styled.TouchableOpacity`
    width: ${WIDTH*0.2};
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    background-color: ${({theme, checked})=> checked? theme.storeButton : theme.background}
`;

const ButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-self: center;
    width: 95%;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.text};
    background-color: ${({theme})=> theme.background}
`;

const CurrentLocContainer = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border-width: 1px;
`;

const StyledImage = styled.View`
    background-color:${({ theme }) => theme.imageBackground};
    height: 60;
    width: 60;
    border-radius: 50px;
`;

const ContentContainter = styled.View`
    padding: 0px 10px;
`;

const ContentTitleText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
    color:${({ theme }) => theme.text};
`;

const ContentText = styled.Text`
    font-size: 12px;
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
    font-size: 10px;
    font-weight: bold;
    color:${({ theme }) => theme.background};
`;

const Button = ({item:{id, name}, onPress, checked}) => {
    return(
        <ButtonContainer onPress={onPress} checked={checked}>
            <ButtonText>{name}</ButtonText>
        </ButtonContainer>
    );
};

const Store = ({item: {url, id, name, ment, distance, score}, onPress, onStarPress, isStar, theme}) => {
    var sc = Number.parseFloat(score).toFixed(1);
    return (
        <ItemContainer onPress={onPress} >
            {/* <StyledImage source={{uri: url}}/> */}
            <StyledImage />
            <ContentContainter>
                <ContentTitleText>{name}</ContentTitleText>
                <ContentText>{ment}</ContentText>
                <ContentText>{distance}M</ContentText>
            </ContentContainter>
            <StarBox>
                {isStar ?
                            (
                                <MaterialCommunityIcons name="star" size={30} onPress={onStarPress} color="yellow"
                                    style={{ marginLeft: 15, marginBottom: 5, opacity: 0.7 }} />
                            )
                            : (
                                <MaterialCommunityIcons name="star-outline" size={30} onPress={onStarPress} color="yellow"
                                    style={{ marginLeft: 15, marginBottom: 5, opacity: 0.7 }} />
                            )}
                </StarBox>
            <ScoreBox>
                <MaterialCommunityIcons name="star" size={12} color={theme.background}/>
                <ScoreText>{sc}</ScoreText>
            </ScoreBox>
        </ItemContainer>
    );
};

const SortButtonContainer = styled.View`
    height: ${HEIGHT*0.06};
    width: 100%;
    padding: 5px;
`;

const StoresConteinter = styled.View`
    flex: 1;
    margin-top: 5px;
`;

const StoreMap = ({navigation, route}) => {
    const longi = route.params.longi;
    const lati = route.params.lati;
    
    const theme = useContext(ThemeContext);

    const [isStar, setIsStar] = useState(false);
    const [sort, setSort] = useState(0);
    const [region, setRegion] = useState({
        longitude: longi,
        latitude: lati,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const _onStorePress = item => {
        navigation.navigate('StoreDetailStack', { id: item.id, name: item.storeName });
    };

    const ButtonPress = item => {
        setSort(item['id']);
    };

    const _onStarPress = () => {setIsStar(!isStar);}

    return ( 
        <Container> 
        <MapView 
        style={{
            width: WIDTH,
            height: HEIGHT*0.4,
        }}
        initialRegion={{
            longitude: longi,
            latitude: lati,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }}
        region={region}
        onRegionChangeComplete={(r) => setRegion(r)}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        loadingEnabled={true}
        >
        </MapView>
        <CurrentLocContainer onPress={()=> setRegion({
             longitude: longi,
             latitude: lati,
             latitudeDelta: 0.01,
             longitudeDelta: 0.01,
        })}>
            <MaterialCommunityIcons name="map-marker" size={30} color="black"/>
        </CurrentLocContainer>
        <SortButtonContainer>
            <FlatList
            showsHorizontalScrollIndicator={false}
             horizontal={true}
             data={Memus}
             keyExtractor={item => item['id'].toString()}
             renderItem={({item}) => (
                 <Button item={item} onPress={()=> ButtonPress(item)} checked={sort===item['id']}/>
             )} />
        </SortButtonContainer>
        <ScrollView>
            <StoresConteinter>
                <FlatList
                horizontal={false}
                keyExtractor={item => item['id'.toString()]}
                data={StoreList}
                renderItem={({item}) => (
                    <Store item={item} onPress={()=> _onStorePress(item)} onStarPress={_onStarPress} isStar={isStar} theme={theme} />
                )}/>
            </StoresConteinter>
        </ScrollView>
    </Container>
    );
};

export default StoreMap;