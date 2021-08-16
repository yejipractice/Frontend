import React, {createContext} from 'react';

const UrlContext = createContext({
    url: "http://49.50.167.119:8761",
    aurl: "http://49.50.167.119:8761",
    surl: "http://49.50.167.119:8761",
});

const UrlProvider = ({children}) => {
    
    return (
        <UrlContext.Provider value={url}>
            {children}
        </UrlContext.Provider>
    );
};

export {UrlContext, UrlProvider};