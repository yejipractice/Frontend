import React, {createContext} from 'react';

const UrlContext = createContext({
   url: "http://172.16.100.109:54419",
   aurl: "http://172.16.100.109:53362",
});

const UrlProvider = ({children}) => {
    
    return (
        <UrlContext.Provider value={url}>
            {children}
        </UrlContext.Provider>
    );
};

export {UrlContext, UrlProvider};