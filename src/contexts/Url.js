import React, {createContext} from 'react';

const UrlContext = createContext({
   url: "http://172.16.101.137:52323",
});

const UrlProvider = ({children}) => {
    
    return (
        <UrlContext.Provider value={url}>
            {children}
        </UrlContext.Provider>
    );
};

export {UrlContext, UrlProvider};