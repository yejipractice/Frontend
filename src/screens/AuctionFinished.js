import React, {useState, useContext} from 'react';
import styled, {ThemeContext} from "styled-components/native";
import {Text, Dimensions} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const WIDTH = Dimensions.get("screen").width; 

const HEIGHT = Dimensions.get("screen").height; 

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
`;

const AuctionsContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const DropBoxesContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 1% 0;
    background-color: ${({theme})=> theme.storeButton};
`;

const AuctionFinished = () => {
    const theme = useContext(ThemeContext);

    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState("");
    const [list1, setList1] = useState([
        {label: "정렬기준1", value: "정렬기준1"},
        {label: "정렬기준2", value: "정렬기준2"},
        {label: "정렬기준3", value: "정렬기준3"}
    ]);

    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState("");
    const [list2, setList2] = useState([
        {label: "정렬기준1", value: "정렬기준1"},
        {label: "정렬기준2", value: "정렬기준2"},
        {label: "정렬기준3", value: "정렬기준3"}
    ]);

    const [open3, setOpen3] = useState(false);
    const [selected3, setSelected3] = useState("");
    const [list3, setList3] = useState([
        {label: "정렬기준1", value: "정렬기준1"},
        {label: "정렬기준2", value: "정렬기준2"},
        {label: "정렬기준3", value: "정렬기준3"}
    ]);

    return (
        <Container>
             <DropBoxesContainer>
                <DropDownPicker
                open={open1}
                value={selected1}
                items={list1}
                setOpen={setOpen1}
                setValue={setSelected1}
                setItems={setList1}
                containerStyle={{width: WIDTH*0.28}}
                placeholder="정렬기준1"
                placeholderStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                listMode="SCROLLVIEW" />

                <DropDownPicker
                open={open2}
                value={selected2}
                items={list2}
                setOpen={setOpen2}
                setValue={setSelected2}
                setItems={setList2}
                containerStyle={{width: WIDTH*0.28}}
                placeholder="정렬기준2"
                placeholderStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                listMode="SCROLLVIEW" />

                <DropDownPicker 
                open={open3}
                value={selected3}
                items={list3}
                setOpen={setOpen3}
                setValue={setSelected3}
                setItems={setList3}
                containerStyle={{width: WIDTH*0.28}}
                placeholder="정렬기준3"
                placeholderStyle={{color: theme.text, fontSize: 14, fontWeight: "bold"}}
                listMode="SCROLLVIEW" />
            </DropBoxesContainer>
            <AuctionsContainer>
            <Text style={{fontSize: 30}}>AuctionFinished Screen</Text>
            </AuctionsContainer>
        </Container>
    );
};

export default AuctionFinished; 