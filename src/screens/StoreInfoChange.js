import React,{useState} from 'react';
import styled from "styled-components/native";
import {View, Modal, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {ProfileImage, InfoText, Button, Image} from "../components";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {removeWhitespace, validatePassword} from "../utils/common";
import Postcode from "@actbase/react-daum-postcode";

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

const FileContainer = styled.View`
    margin-left: 20%;
`;

const StoreInfoChange = () => {
    // 임의로 설정, 연동 후 기존 설정값 등록
    const [Photo, setPhoto] = useState(null);
    const [address, setAddress] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [userName, setuserName] = useState('안녕하세요');
    const [password, setPassword] = useState('');
    const [document, setDocument] = useState(null);

    // 닉네임 중복확인, 핸드폰 인증
    const [isNameCheck, setNameCheck] = useState(false);
    const [isPhoneCheck, setPhoneCheck] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const [isModal, setModal] = useState(false);

    const _handleChangeButtonPress = () => {
        if(!address){
            Alert.alert('','주소를 입력해주세요');
            return;
        }
        if(!isPhoneCheck){
            Alert.alert('','전화번호 인증을 해주세요');
            return;
        }
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
        if(!document){
            Alert.alert('','서류를 등록해주세요');
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

                {/* 주소 검색 후 상세 주소 입력 가능 */}
                <InfoContainer>
                    <InfoText
                        label="주소"
                        value={address}
                        onChangeText={ text => setAddress(text)}
                        placeholder="주소"
                        returnKeyType= "done"
                        isChanged
                        showButton
                        title="검색"
                        editable={address === '' ? false : true}
                        onPress={() => {setModal(true); setAddress("");}}
                    />
                    <Modal visible={isModal} transparent={true}>
                        <TouchableOpacity style={styles.background} onPress={() => setModal(false)}/>
                        <View style={styles.modal}>
                            <Postcode
                                style={{  width: 350, height: 450 }}
                                jsOptions={{ animated: true, hideMapBtn: true }}
                                onSelected={data => {
                                setAddress(JSON.stringify(data.address).replace(/\"/g,''));
                                setModal(false);
                                }}
                            />
                        </View>
                    </Modal>

                    {/* 전화번호 인증 완료시 disabled 처리 */}
                    <InfoText
                        label="전화번호"
                        value={phoneNumber}
                        onChangeText={ text => setPhoneNumber(removeWhitespace(text))}
                        placeholder="전화번호"
                        returnKeyType= "done"
                        isChanged
                        keyboardType="number-pad"
                        showButton
                        title="인증"
                        disabled={ phoneNumber.length === 11 ? false : true}
                        onPress={()=>{setPhoneCheck(true)}}
                        />
                        

                    <InfoText
                        label="닉네임"
                        value={userName}
                        onChangeText={ text => setuserName(text)}
                        placeholder="닉네임"
                        returnKeyType= "done"
                        isChanged
                        showButton
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
                        showButton                                
                        title="변경"
                        disabled={validatePassword(password) ? false : true}
                        onPress={()=> {
                            setIsPassword(true);
                            setPassword(password);
                            editable=false;
                        }}                 
                        />
                    <InfoText
                        label="서류"
                        content={ document === null ? "서류 등록 필요"  : "등록됨"}
                        title={ document === null ? "등록"  : "변경"}
                    />
                    <FileContainer>
                    <View 
                        style={{marginTop:-35,}}>
                        <Image 
                            url={document}
                            onChangeImage={url => setDocument(url)}
                        /> 
                    </View>
                    </FileContainer>
                
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


export default StoreInfoChange;