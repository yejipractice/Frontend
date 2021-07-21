import React, {useState, useEffect, useRef} from 'react';
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

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-top: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;



const  UserInfoChange = () => {

    // 임의로 설정, 연동 후 기존 설정값 등록
    const [Photo, setPhoto] = useState(null);
    const [userName, setuserName] = useState('안녕하세요');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('23');
    const [gender, setGender] = useState('female');

    const [errorMessage, setErrorMessage] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const didMountRef = useRef();
    
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

    //에러 메세지 설정 
    useEffect(() => {
        if (didMountRef.current) {
            let _errorMessage = "";
            if (uploaded) {
                _errorMessage = "정보를 입력해주세요";
                if (!userName) {
                    _errorMessage = "닉네임을 입력하세요.";
                } else if (!password) {
                    _errorMessage = "비밀번호를 입력하세요.";
                } else if (!validatePassword(password)) {
                    _errorMessage = "비밀번호 조건을 확인하세요.";
                } else if (!age) {
                    _errorMessage = "나이를 입력하세요.";
                }else if (!loc) {
                    _errorMessage = "지역을 입력해주세요.";
                }
                else {
                    _errorMessage = "";
                }
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
        }
    }, [userName, password, age, loc, uploaded]);

    const _handleChangeButtonPress = () => {
        setUploaded(true);
    };
  
    useEffect(() => {
      const result = getLocation();
    }, []);

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
                        title="적용"
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
                        title="변경"
                        disabled={validatePassword(password) ? false : true}                 
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

                <InfoContainer>
                    <ErrorText>{errorMessage}</ErrorText>
                </InfoContainer>
                
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