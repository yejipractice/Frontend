import React, {useState, useEffect} from 'react';
import styled from "styled-components/native";
import {View, Dimensions, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {ProfileImage, InfoText, Button, RadioButton} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace, validatePassword } from '../utils/common';
import Postcode from '@actbase/react-daum-postcode';
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {MaterialCommunityIcons} from "@expo/vector-icons";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
`;

const InfoContainer = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
    margin-left: 40px;
`;

const CenterContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-bottom: 5%;
`;
const RowContainer = styled.View`
    flex: 1;
    flex-direction: row;
    margin-bottom: 5px;
    margin-top: 6px;
`;

const RadioTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-right: 7px;
    width: 20%;
    align-self: center;
`;

const MapContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const CurrentButton = styled.TouchableOpacity`
width: 40px;
height: 40px;
position: absolute;
top: 10px;
right: 13%;
justify-content: center;
align-items: center;
border-radius: 50px;
border-width: 1px;
`;



const  UserInfoChange = () => {

    // 임의로 설정, 연동 후 기존 설정값 등록
    const [Photo, setPhoto] = useState(null);
    const [userName, setuserName] = useState('안녕하세요');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('23');
    const [gender, setGender] = useState('female');
    // 닉네임 중복확인, 핸드폰 인증
    const [isNameCheck, setNameCheck] = useState(false);
    const [isPhoneCheck, setPhoneCheck] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

      //현재 위치
  const [loc, setLoc] = useState(null); //선택 지역 
  const [lati, setLati] = useState(37.535887);
  const [longi, setLongi] = useState(126.984063);
  const [region, setRegion] = useState({
    longitude: longi,
    latitude: lati,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
});
const [selectedLocation, setSelectedLocation] = useState(null);

    //현재 위치 
    const getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status=="granted") {
            let location = await Location.getCurrentPositionAsync({}); 
            setLati(location.coords.latitude);
            setLongi(location.coords.longitude);
        }
        return loc;
    };
  
    const convertKoreanLocation = async(res) => {
      let result = "";
      if (res.localityInfo.administrative.length >= 4){
        let gu = res.localityInfo.administrative[3].name;
        if (gu[gu.length-1]==="구"){
          result = `${res.principalSubdivision} ${res.localityInfo.administrative[2].name} ${res.localityInfo.administrative[3].name}`;
        }else {
          result = `${res.principalSubdivision} ${res.localityInfo.administrative[2].name}`;
        }
      }else{
        result = `${res.principalSubdivision} ${res.localityInfo.administrative[2].name}`;
      }
  
      return result;
    };
  
    const getKoreanLocation = async (lat, lng, api) => {
      let response = await fetch(api);
      let res = await response.json();
      let result = convertKoreanLocation(res);
      return result;
    };
  
    const getGeocodeAsync = async (location) => {
      let geocode = await Location.reverseGeocodeAsync(location);
      let region = geocode[0]["region"]
      let city = geocode[0]["city"]
      let street = geocode[0]["street"];
  
      let selectedLatitude = location["latitude"];
      let selectedLongitude = location["longitude"];
      let aapi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${selectedLatitude}&longitude=${selectedLongitude}&localityLanguage=ko`;
      
      let res = await getKoreanLocation(selectedLatitude, selectedLongitude, aapi);
      setLoc(res);
  
  
    };
  
    useEffect(() => {
      const result = getLocation();
    }, []);

    const _handleChangeButtonPress = () => {
        if (!userName) {
            Alert.alert('','닉네임을 입력해주세요');
            return;
        }
        if(!isNameCheck){
            Alert.alert('','닉네임 중복확인을 해주세요');
            return;
        }
        if(!password){
            Alert.alert('','비밀번호를 설정해주세요');
            return;
        }
        if(password){
            if(!isPassword){
                Alert.alert('','비밀번호를 설정해주세요');
                return; 
            }
        }
        if(!age){
            Alert.alert('','나이를 입력해주세요');
            return; 
        }
        if(!loc){
            Alert.alert('','지역을 입력해주세요');
            return; 
        }
    

     };

    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}>

                <View style={{marginTop: 30}} ></View>

               <ProfileImage 
                url={Photo}
                onChangeImage={url => setPhoto(url)}
                showButton />

                <InfoContainer>
                    <InfoText
                        label="닉네임"
                        value={userName}
                        onChangeText={ text => setuserName(text)}
                        placeholder="닉네임"
                        returnKeyType= "done"
                        isChanged
                        showButton
                        title="적용"
                        onPress={()=> {
                            setNameCheck(true);
                        }}  
                        />
                    <InfoText label="이메일" content="이메일주소"/>
                    <InfoText
                        label="비밀번호"
                        value={password}
                        onChangeText={ text => setPassword(removeWhitespace(text))}
                        placeholder="특문, 숫자, 영문 포함 8자-16자"
                        returnKeyType= "done"
                        isChanged
                        isPassword
                        showButton                                
                        title="변경"
                        disabled={validatePassword(password) ? false : true}
                        onPress={()=> {
                            setIsPassword(true);
                            setPassword(password);
                        }}                 
                        />

                    <InfoText
                        label="나이"
                        value={age}
                        onChangeText={ text => setAge(text)}
                        placeholder="나이"
                        returnKeyType= "done"
                        isChanged
                        keyboardType="number-pad"
                        />
                        <RowContainer>
                            
                            <RadioTitle>성별</RadioTitle>
                            <RadioButton 
                                label="여자"
                                status={(gender==="female"? "checked" : "unchecked")}
                                containerStyle={{marginBottom:0, marginLeft: 0, marginRight: 0}}
                                onPress={() => setGender('female')}
                            />
                            <RadioButton 
                                label="남자"
                                status={(gender==="male"? "checked" : "unchecked")}
                                containerStyle={{marginBottom:0, marginLeft: 0, marginRight: 0}}
                                onPress={() => setGender('male')}
                            />
                    </RowContainer>
                        
                <InfoText
                        label="지역"
                        value= {(selectedLocation && loc !== null)? String(loc) : ""}
                        placeholder="지역이 선택되지 않았습니다."
                        returnKeyType= "done"
                        isChanged
                        editable={false}
                        />
                </InfoContainer>
                <MapContainer>
                <MapView 
                style={{
                    width: WIDTH*0.8,
                    height: HEIGHT*0.2,
                }}
                initialRegion={{
                    longitude: longi,
                    latitude: lati,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                region={region}
                onRegionChangeComplete={(r) => setRegion(r)}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                loadingEnabled={true}>
                    <Marker
                    coordinate={region}
                    pinColor="blue"
                    onPress={() => {setSelectedLocation(region); getGeocodeAsync(region);}}
                    />
                </MapView>
                <CurrentButton onPress= {()=> setRegion({
                            longitude: longi,
                            latitude: lati,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01, })}>
                <MaterialCommunityIcons name="map-marker" size={30} color="black"/>
                </CurrentButton>
                </MapContainer>
                
               
                
                <CenterContainer>
                    {/* 변경사항 서버 저장 */}
                    <Button 
                    containerStyle={{width:'50%', }}
                    title="저장"
                    onPress={ _handleChangeButtonPress }
                    />
                </CenterContainer>

                </KeyboardAwareScrollView>
            </Container>
        
    );
};

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: '40%',
        backgroundColor: 'white',
      },
      background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
});

export default UserInfoChange; 