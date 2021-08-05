import React, { useState,useEffect,useRef } from 'react';
import styled from "styled-components/native";
import { Dimensions, Modal, View, StyleSheet,TouchableOpacity} from "react-native";
import { Button, Image, ManageText, SmallButton } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    padding: 10px;
`;

const InfoContainer = styled.View`
    background-color: ${({ theme }) => theme.background}; 
    margin: 15px;
    padding: 10px;
    border-radius: 6px;
    border: 0.7px solid black;
`;

const ChangeContainer = styled.View`
    flex: 1; 
    alignItems: flex-end;
    justify-content: flex-end;
    margin-bottom: 5px;
    flex-direction: row;
`;

const ChangeText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: ${({theme})=> theme.titleColor};
    margin-right: 5px;
`;

const RowItemContainer = styled.View`
    padding: 5px 10px 15px;
    flex-direction: column;
    border-bottom-width: ${({ border }) => border ? border : 1}px;
    border-color: ${({ theme }) => theme.label};
    margin: 5px 0 5px 0;
`;

const DescTitle = styled.Text`
    font-size: ${({ size }) => size ? size : 19}px;
    font-weight: bold;
    color: ${({ theme }) => theme.text}; 
`;

const MenuContainer = styled.View`
    background-color: ${({ theme }) => theme.background}; 
    flex-direction: column;
    margin : 10% 10px 0 10px;
    border-radius: 10px;
    border: 1px solid black;
    padding: 15px;
    
`;

const Label = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.text}
    align-self: flex-start;
    margin-top: 3%;
`;

const ButtonContainer = styled.View`
    margin-top: 3%;
    flex-direction: row;
    justify-content: center;
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
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const ButtonBox = styled.TouchableOpacity`
    background-color: ${({theme, checked})=> checked? theme.titleColor :theme.storeButton};
    width: ${({width})=> width? width : 30}%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: ${HEIGHT*0.075}
`;

const ButtonText = styled.Text`
    font-size: 15px;
`;


const StoreManage = ({ navigation }) => {

    // 업체 기본정보
    const [phoneNumber, setPhoneNumber] = useState('028888888');
    const [address, setAddress] = useState('서울시 00구 00동');
    const [storeType, setStoreType] = useState("한식");
    const [openTime, setOpeningTime] = useState('11시 00분');
    const [closeTime, setClosingTime] = useState('22시 00분');
    
    //업체 편의정보
    const [isParking, setIsParking] = useState(true);
    const [isParkingFree, setIsParkingFree] = useState(false);
    const [isValet, setISValet] = useState(false);

    // 기타시설
    const [room, setRoom] = useState(true); // 룸
    const [groupseat, setGroupseat] = useState(true); // 단체석
    const [sedentary, setSedentary ] = useState(false); // 좌식
    const [internet, setInternet] = useState(true); // 무선인터넷
    const [highchair, setHighchair] = useState(true); // 유아용 의자
    const [handicap, setHandicap] = useState(false); // 장애인 편의시설
    const [pet, setPet] = useState(false); // 반려동물

    // 메뉴 에러 검사
    const [menuDisalbed, setMenuDisalbed] = useState(true);

    // 메뉴추가/수정 팝업창
    const [isMenuModal, setIsMenuModal] = useState(false);

    // 업체 기본정보 수정 + 스피너 추가 필요
    const _onBasicPress = () => {
        // 수정한 값 서버로 넘기기
        navigation.navigate("StoreBasicChange");
    };

    // 업체 편의정보 수정 + 스피너 추가 필요
    const _onConveniencePress = () => {
        // 수정한 값 서버로 넘기기
        navigation.navigate("StoreConvChange");
    };

    const [menus, setMenus] = useState([
        {
            id: 1,
            menuname: "메뉴1", 
            price: "7000원", 
            detail: "맛있어요", 
            url: "",
        }
    ]);

    // 업체 메뉴정보 input
    const [inputs, setInputs] = useState([]);
    const [url, setUrl] = useState();

    const { menuname, price, detail } = inputs;

    const handleChange = (event) => {
        // input의 속성
        const { name, text } = event;

        setInputs({
            ...inputs,
            [name]: text
          });
    }

    const nextId = useRef(2);

    useEffect(() => {
        setMenuDisalbed(            
            !(menuname && price && detail && url  )
        );
    }, [menuname, price, detail, url]);

    // 메뉴 등록
    const _onMenuPress = () => {
        const menu = {
            id: nextId.current,
            menuname,
            price,
            detail,
            url: url,
        };
        setMenus([...menus, menu]);
        
        setInputs({
            menuname: '', 
            price: '', 
            detail: '', 
        });
        setUrl('');
        nextId.current += 1;

        console.log(menus);
        setIsMenuModal(false);
    }

    // 메뉴 등록 취소
    const _onMenuCancel = () => {
        setIsMenuModal(false);
        setInputs({
            menuname: '', 
            price: '', 
            detail: '', 
        });
        setUrl('');
    }

    // 메뉴 삭제
    const _onMenuDelete = id => {
        setMenus(menus.filter(menu => menu.id !== id));
    }

    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}
            >
                {/* 업체 기본정보 */}
                <View style={{marginLeft: 10}}>
                    <DescTitle size={23}>업체 기본정보</DescTitle>
                </View>
                <InfoContainer>
                    <ManageText 
                        label="업체 전화번호"
                        TextChange
                        onChangePress={_onBasicPress}
                        value={phoneNumber}
                        editable={false}
                    />
                    <ManageText 
                        label="주소"
                        value={address}
                        editable={false}
                    />
                    <ManageText 
                        label="영업시간"
                        value={openTime+" ~ "+closeTime}
                        editable={false}
                    />
                    <RowItemContainer>
                        <DescTitle>업체 사진</DescTitle>
                    </RowItemContainer>
                    <ManageText 
                        label="업체유형"
                        value={storeType}
                        editable={false}
                    />
                </InfoContainer>

                {/* 업체 메뉴정보 */}
                <View style={{marginLeft: 10}}>
                    <DescTitle size={23}>업체 메뉴정보</DescTitle>
                </View>

                <InfoContainer>
                    <View style={styles.row}>
                        <ChangeContainer>
                            <ChangeText onPress={() => {setIsMenuModal(true);}}>메뉴 추가</ChangeText>
                        </ChangeContainer> 
                    </View>
                    <Modal visible={isMenuModal} transparent={true}>
                        <TouchableOpacity style={styles.background} onPress={() => setIsMenuModal(false)} />
                        <MenuContainer>
                            <ManageText 
                                name="menuname"
                                value={menuname}
                                label="메뉴 이름"
                                placeholder="메뉴 이름"
                                onChange={handleChange}
                            />
                            <ManageText
                                name="price"
                                label="가격"
                                placeholder="가격"
                                keyboardType="number-pad"
                                value={price}
                                onChange={handleChange}
                            />
                            <ManageText 
                                name="detail"
                                label="설명"
                                placeholder="설명"
                                multiline={true}
                                value={detail}
                                onChange={handleChange}
                            />
                            <RowItemContainer>
                                <DescTitle>메뉴 사진</DescTitle>
                                <Image title="사진 첨부"
                                    url={url}
                                    onChangeImage={url => setUrl(url)}
                                    containerStyle={{ width: '70%', marginTop: '3%'}}
                            />
                            </RowItemContainer>
                            <ButtonContainer>
                                <Button title="취소" onPress={_onMenuCancel} containerStyle={{ width: '40%', marginRight: 10}}/>
                                <Button title="저장" onPress={_onMenuPress} containerStyle={{ width: '40%' }} disabled={menuDisalbed}/>
                            </ButtonContainer>
                        </MenuContainer>
                    </Modal>
                    
                    {menus.map(item => (
                        
                        <RowItemContainer>
                            <View key={item.id} style={{flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Label >{item.menuname}</Label>
                                <Label >{item.price}</Label>
                                <Label >{item.detail}</Label>
                                <SmallButton title="삭제" onPress={() => {_onMenuDelete(item.id);}} containerStyle={{ width: '20%', }}/>
                            </View>

                        </RowItemContainer>
                    ))} 

                </InfoContainer>
                
                {/* 업체 편의정보 */}
                <View style={{marginLeft: 10}}>
                    <DescTitle size={23}>업체 편의정보</DescTitle>
                </View>

                <InfoContainer>
                    <ManageText 
                        label="주차"
                        TextChange
                        onChangePress={_onConveniencePress}
                        isText
                        text={isParking ? (isParkingFree ? "무료" : "유료" ) : ""}
                    />
                    <ManageText 
                        label="발렛파킹"
                        isText
                        text={isValet ? "제공" : "미제공"}
                    />
                    {/* 기타시설 list에 넣어서 관리 생각.. */}
                    <ManageText 
                        label="기타시설"
                        isText
                        text={
                            (room ? "룸 " : "") + 
                            (groupseat ? "단체석 " : "") +
                            (sedentary ? "좌식 " : "") +
                            (internet ? "무선인터넷 " : "") +
                            (highchair ? "유아용 의자 " : "") +
                            (handicap ? "장애인 편의시설 " : "") +
                            (pet ? "반려동물 " : "") 
                        }
                    />
                    
                </InfoContainer>
                
            </KeyboardAwareScrollView>
        </Container>

    );
};

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: '60%',
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

export default StoreManage;