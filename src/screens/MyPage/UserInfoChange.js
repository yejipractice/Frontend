import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from "styled-components/native";
import {View, Dimensions, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {ProfileImage, InfoText, Button, RadioButton} from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace, validateEmail, validatePassword } from '../../utils/common';
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {UrlContext, ProgressContext, LoginContext} from "../../contexts";

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



const  UserInfoChange = ({navigation, route}) => {

    const {url} = useContext(UrlContext);
    const {spinner} = useContext(ProgressContext);
    const {token} = useContext(LoginContext);

    const [photo, setPhoto] = useState(route.params.photo);
    const [userName, setuserName] = useState(route.params.userName);
    const email = route.params.email;
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(route.params.age);
    const [gender, setGender] = useState(route.params.gender);

    const [errorMessage, setErrorMessage] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const didMountRef = useRef();
    
    //현재 위치
    const [loc, setLoc] = useState(route.params.addr); //선택 지역 
    const [lati, setLati] = useState(route.params.lati);
    const [longi, setLongi] = useState(route.params.longi);
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
                    setDisabled(false);
                    _errorMessage = "";
                }
            }
            setErrorMessage(_errorMessage);

        } else {
            didMountRef.current = true;
        }
    }, [userName, password, age, loc, uploaded]);

    // 서버 put 처리 (회원 정보 수정)
    const putApi = async (url) => {

        console.log(url);

        let options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN' : token
            },
            body: JSON.stringify({ 
                name: userName,
                password: password,
                age: parseInt(age),
                gender: gender,
                addr: String(loc),
                latitude: lati,
                longitude: longi,

            }),

        };
        try {
            let response = await fetch(url,options);
            let res = await response.json();
            console.log(res);

            return res["success"];

          } catch (error) {
            console.error(error);
          }
    }

    // 회원 이미지 등록
    const postApi = async () => {
        let fixedUrl = url+'/member/image'; 

        let filename = photo.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('file', { uri: photo, name: filename, type: type });

        console.log(formData);
        let options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'X-AUTH-TOKEN' : token,
            },
            body: formData,

        };
        try {
            let response = await fetch(fixedUrl, options);
            let res = await response.json();

            console.log(res);
            return res["success"];


          } catch (error) {
            console.error(error);
          }

    }


    // 정보 수정

    const _handleChangeButtonPress = async() => {
        setUploaded(true);
        if(!disabled){
            try{
                spinner.start();


                const result = await putApi(url+"/member/customer");
                const result_photo = await postApi();

                if(result && result_photo){
                    navigation.navigate("UserInfo");
                }
                else{
                    alert("저장에 실패했습니다.");
                }

            }catch(e){
                    console.log("Error", e.message);
            }finally{
                spinner.stop();
            }

        }

    }
  
    useEffect(() => {
      const result = getLocation();
    }, []);

    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}>

                <View style={{marginTop: 30}} ></View>

               <ProfileImage 
                url={photo}
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
                    <InfoText label="이메일" content={email}/>
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
                        value={String(age)}
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
                        value= {( loc !== null)? String(loc) : ""}
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