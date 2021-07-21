import React, { useState,useEffect,useRef, useLayoutEffect } from 'react';
import styled from "styled-components/native";
import { Dimensions, Modal, View, StyleSheet,TouchableOpacity } from "react-native";
import { DateTimePicker, SmallButton, ManageText } from '../components';
import { theme } from '../theme';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Postcode from '@actbase/react-daum-postcode';
import DropDownPicker from "react-native-dropdown-picker";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Container = styled.View`
    background-color: ${({ theme }) => theme.background};
    padding: 10px;
    flex:1;
`;

const InfoContainer = styled.View`
    background-color: ${({ theme }) => theme.background}; 
    margin: 15px;
    padding: 10px;
    border-radius: 6px;
    border: 0.7px solid black;
`;

const RowItemContainer = styled.View`
    padding: 5px 10px 15px;
    flex-direction: column;
    border-bottom-width: ${({ border }) => border ? border : 1}px;
    border-color: ${({ theme }) => theme.label};
    margin: 5px 0 5px 0;
`;

const TypeContainer = styled.View`
    position: absolute;
    height: 200px;
    left: 30px;
    bottom: 45px;
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
}))`
      width: ${({ width }) => width ? width : 80}%;
      background-color: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.text};
      padding: 10px 15px;
      font-size: 16px;
      border: 1px solid ${({ theme }) => theme.inputBorder};
      border-radius: 4px;
      margin-top: 10px;
  `;

const DescTitle = styled.Text`
    font-size: ${({ size }) => size ? size : 19}px;
    font-weight: bold;
    color: ${({ theme }) => theme.text}; 
`;

const StoreImage = styled.Image`
    background-color:${({theme}) => theme.imageBackground};
    height: ${HEIGHT*0.12}px;
    width: ${HEIGHT*0.12}px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
    margin-left: 10px;
`;
const TimeContainer = styled.TouchableOpacity`
    background-color: ${({theme})=> theme.background}
    align-items: flex-start;
    border-radius: 4px;
    width: 80%;
    padding: 15px 15px;
    border: 1px solid ${({ theme}) => theme.inputBorder};
    margin-top: 10px;
`;
const ButtonTitle = styled.Text`
  font-size: 16px;
  color: ${({theme})=> theme.inputPlaceholder}
`;



const StoreBasicChange = ({ navigation, route }) => {

    // 업체 기본정보
    const [phoneNumber, setPhoneNumber] = useState('028888888');
    const [address, setAddress] = useState('');

    const [openTime, setOpenTime] = useState('');
    const [openTimeVisible, setOpenTimeVisible] = useState(false);

    const [closeTime, setCloseTime] = useState('');
    const [closeTimeVisible, setCloseTimeVisible] = useState(false);

    const [opening, setOpening] = useState('');
    const [closing, setClosing] = useState('');


    // 업체 사진들
    const [photos, setPhotos] = useState();

    useEffect(() => {
        if (route.params.photos) {
            setPhotos(route.params.photos);
            console.log(route.params.photos);
        }
      }, [route.params.photos, photos]);


    // 업체유형 드롭다운 
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [storeType, setStoreType] = useState([
      {label: "한식", value: "한식"},
      {label: "중식", value: "중식"},
      {label: "일식", value: "일식"},
      {label: "양식", value: "양식"},
      {label: "기타", value: "기타"},
    ]); 

    // 주소 팝업창
    const [isAddressModal, setIsAddressModal] = useState(false);

    // 업로드
    const [disabled, setDisabled] = useState(false)
    const [uploaded, setUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("정보를 입력해주세요.");

    const didMountRef = useRef();


    // 업체 사진 불러오기
    const _onPhotoPress = () => {
        navigation.navigate("MultipleImage", {type: "Store"});
    }


    //에러 메세지 설정 
    useEffect(() => {
        if (didMountRef.current) {
            let _errorMessage = "";
            if (!phoneNumber) {
                _errorMessage = "업체 전화번호를 입력하세요.";
            } else if (!address) {
                _errorMessage = "위치를 입력하세요.";
            } else if (!selectedType) {
                _errorMessage = "업체 유형을 선택하세요.";
            } else if (!photos) {
                _errorMessage = "업체 사진을 첨부하세요.";
            } else if(!openTime) {
                _errorMessage = "오픈시간을 입력하세요.";
            } else if(!closeTime) {
                _errorMessage = "마감시간을 입력하세요.";
            } else if(parseInt(closing)<parseInt(opening)){
                console.log(opening, closing);
                _errorMessage = "마감 시간을 오픈시간 이후으로 설정해주세요."
              }
            else {
                _errorMessage = "";
            }
            setErrorMessage(_errorMessage);

        } else {
            didMountRef.current = true;
        }
    }, [phoneNumber, address, selectedType, photos, openTime, closeTime,opening, closing]);


    useEffect(() => {
        setDisabled(!(phoneNumber && address && selectedType && photos && openTime && closeTime &&!errorMessage));
    }, [phoneNumber, address, selectedType, photos, openTime, closeTime, errorMessage]);

    useEffect(()=> {
        var _open = openTime.slice(0,2)+openTime.slice(4,6);
        var _close = closeTime.slice(0,2)+closeTime.slice(4,6);
        setOpening(_open);
        setClosing(_close);
      },[openTime,closeTime]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                disabled ? (<MaterialCommunityIcons name="check" size={35} onPress={_onBasicPress}
                    style={{ marginRight: 10, marginBottom: 3, opacity: 0.3 }} />)
                    : (<MaterialCommunityIcons name="check" size={35} onPress={_onBasicPress}
                        style={{ marginRight: 10, marginBottom: 3, opacity: 1 }} />)
            )
        });
    }, [disabled]);

    // 오픈시간
    const _handleOpenTimePress =() => {
        setOpenTimeVisible(true);
    };

    const _setOpenTime = time => {

        let h = time.getHours();
        let m = time.getMinutes();

        if(h < 10){
          h = "0"+h;
        }

        if(m< 10){
          m = "0"+m;
        }
        setOpenTime(h+"시 "+m+"분");
        setOpenTimeVisible(false);
    };

    const _hideOpenTimePicker = () => {
      setOpenTimeVisible(false);
    };

    // 마감 시간
     const _handleCloseTimePress =() => {
        setCloseTimeVisible(true);
    };

    const _setCloseTime = time => {
        let h = time.getHours();
        let m = time.getMinutes();

        if(h < 10){
          h = "0"+h;
        }

        if(m< 10){
          m = "0"+m;
        }

        setCloseTime(h+"시 "+m+"분");
        setCloseTimeVisible(false);

    };

    const _hideCloseTimePicker = () => {
      setCloseTimeVisible(false);
    };

    // 기본정보 수정 
    const _onBasicPress = () => {
        setUploaded(true);
        if (!disabled) {
            setErrorMessage("아래 정보를 입력해주세요");
            setDisabled(true);
            setUploaded(false);
            navigation.navigate("Mypage_Store");
        }
    };


    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}
            >
                {uploaded && disabled && <ErrorText>{errorMessage}</ErrorText>}
                {/* 업체 기본정보 */}
                <View style={{marginLeft: 10}}>
                    <DescTitle size={23}>업체 기본정보</DescTitle>
               
                </View>
                <InfoContainer>
                    <ManageText 
                        label="업체 전화번호"
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        placeholder="업체 전화번호"
                        keyboardType="number-pad"
                    />
                    <RowItemContainer>
                        <DescTitle>위치</DescTitle>
                        <View style={styles.row}>
                            <StyledTextInput
                                width={80}
                                value={address}
                                placeholder="주소"
                                returnKeyType= "done"
                                editable={address === '' ? false : true}
                            />
                            <SmallButton title="검색" containerStyle={{width: '20%', marginLeft:10}}
                                onPress={() => {setIsAddressModal(true); setAddress("");}}
                            />
                        </View>
                    <Modal visible={isAddressModal} transparent={true}>
                        <TouchableOpacity style={styles.background} onPress={() => setIsAddressModal(false)}/>
                        <View style={styles.modal}>
                            <Postcode
                                style={{  width: 350, height: 450 }}
                                jsOptions={{ animated: true, hideMapBtn: true }}
                                onSelected={data => {
                                setAddress(JSON.stringify(data.address).replace(/\"/g,''));
                                setIsAddressModal(false);
                                }}
                            />
                        </View>
                    </Modal>
                    </RowItemContainer>

                    <RowItemContainer>
                        <DescTitle>영업시간</DescTitle>
                    <TimeContainer onPress={_handleOpenTimePress} >
                        <ButtonTitle>{openTime ? openTime :"오픈시간을 입력하세요."}</ButtonTitle>
                    </TimeContainer>
                        <DateTimePicker visible={openTimeVisible} mode="time" 
                            handleConfirm={_setOpenTime} handleCancel={_hideOpenTimePicker}/>

                        <TimeContainer onPress={_handleCloseTimePress} >
                        <ButtonTitle>{closeTime ? closeTime :"마감시간을 입력하세요."}</ButtonTitle>
                    </TimeContainer>
                        <DateTimePicker visible={closeTimeVisible} mode="time" 
                            handleConfirm={_setCloseTime} handleCancel={_hideCloseTimePicker}/>

                    </RowItemContainer>

                    <RowItemContainer>
                        <DescTitle>업체 사진</DescTitle>
                        <SmallButton 
                            title="사진첨부" 
                            containerStyle ={{width: '30%', marginTop: '3%'}}
                            onPress={_onPhotoPress}
                        />

                    </RowItemContainer>

                    
                    <RowItemContainer>
                        <DescTitle>업체 유형</DescTitle>
                        <View style={{height: HEIGHT*0.05}} />
                    </RowItemContainer>
              
                </InfoContainer>
                <TypeContainer>
                        <DropDownPicker 
                                open={open}
                                value={selectedType}
                                items={storeType}
                                setOpen={setOpen}
                                setValue={setSelectedType}
                                setItems={setStoreType}
                                containerStyle={{width: WIDTH*0.43, alignSelf: "flex-start", marginTop: 10}}
                                placeholder="업체 유형"
                                placeholderStyle={{color: theme.label, fontSize: 16}}
                                listMode="SCROLLVIEW"
                                maxHeight={150}
                            />  
                </TypeContainer>
                <View style={{height: 150}} />
            </KeyboardAwareScrollView>
        </Container>

    );
};

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: '25%',
        backgroundColor: 'white',
      },
      background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      row: {
        flexDirection:'row',
      }
});

export default StoreBasicChange; 