import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';


const MultipleImage = ({ navigation }) => {

    const theme = useContext(ThemeContext);

    const [isUpload, setIsUpload] = useState(false);

    const _getHeaderLoader = () => (
        <ActivityIndicator size={35} 
            color={theme.titleColor}
            style={{marginRight: 10, marginBottom:3, opacity: 0.7}}/>
    );

    const imagesCallback = (callback) => {
        let i = 0;

        setIsUpload(true);

        navigation.setOptions({
        headerRight: () => _getHeaderLoader() });

        callback.then(async (photos) => {
            const cPhotos = [];
            for(let photo of photos) {
                const pPhoto = await _processImageAsync(photo.uri);
                cPhotos.push({
                    id: i++,
                    uri: pPhoto.uri,
                    name: photo.filename,
                    type: 'image/jpg'
                })
            }
            setIsUpload(false);
            navigation.navigate('ReviewWrite', {photos: cPhotos});
        })
        .catch((e) => console.log(e));
    };

    const _processImageAsync = async (uri) => {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    };

    const _renderDoneButton = (count, onSubmit) => {
        if (!count) return null;
        return (
            <TouchableOpacity title={'Done'} onPress={onSubmit}>
                <MaterialCommunityIcons
                    name="check"
                    size={35} 
                    style={{marginRight: 10, marginBottom:3, opacity: 0.7}}
                    onPress={onSubmit}
                />
      </TouchableOpacity>
    );
  };

    const updateHandler = (count, onSubmit) => {
        navigation.setOptions({
            title: `${count}개 선택`,
            headerRight: () => _renderDoneButton(count, onSubmit)
        });
    };

    const renderSelectedComponent = (number) => {   
        return (
            <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{number}</Text>
            </View>
        );
    };

    const emptyStayComponent = <Text style={styles.emptyStay}>앨범이 비어있습니다(</Text>;

    return (
        <View style={[styles.flex, styles.container]}>
            <ImageBrowser
                max={4}
                onChange={updateHandler}
                callback={imagesCallback}
                renderSelectedComponent={renderSelectedComponent}
                emptyStayComponent={emptyStayComponent}
            />
        </View>
  );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        position: 'relative',
    },
    emptyStay: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff',
    },
});

export default MultipleImage; 