import React, {useState} from 'react';
import {StatusBar, Image} from "react-native";
import {ThemeProvider} from "styled-components/native";
import {theme} from "./theme";
import {Asset} from "expo-asset";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Navigation from './navigations';
import { ProgressProvider, LoginProvider} from './contexts';

// 이미지,폰트 불러오기 
const cachImages = images => {
    return images.map(image => {
        if(typeof image ==="string") {
            return Image.prefetch(image);
        }else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
};


const App = () => {
    //assets(이미지,폰트) 불러왔는지의 state
    const [isReady, setIsReady] = useState(false);

    // 이미지,폰트 불러오기(비동기)
    const _loadAssets = async () => {
        const imageAssets = cachImages([require('../assets/splash.png')]);
        const fontAssets = cacheFonts([]);

        await Promise.all([...imageAssets,...fontAssets]);
    };

    return isReady? (
        <ThemeProvider theme={theme}>
            <LoginProvider>
            <ProgressProvider>
            <StatusBar barStyle="dark-content" />
            <Navigation />
            </ProgressProvider>
            </LoginProvider>
        </ThemeProvider>
    ) : (
        // 로딩중 화면
        <AppLoading
        startAsync={_loadAssets}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
        />
    );
};

export default App;