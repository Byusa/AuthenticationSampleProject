import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer; 

const AuthContext = React.createContext({
    token:'',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpiration = new Date(expirationTime).getTime();

    const remainingDuration = adjExpiration - currentTime;

    return remainingDuration
}

const retrieveStoredToken = ()=>{
    const storeToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate)

    // Avoid to retrive a token when time has passed
    if (remainingTime <= 3600) { // 1 min = 60 sec = 60,000 millisec (1 sec = 1000ms) 3,600 ms=3.6sec  
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return { 
        token : storeToken, 
        duration : remainingTime
    }
}

export const AuthContextProvider = (props) => {
    //local storage is synchronous
    const tokenData =  retrieveStoredToken();
    // const initialToken = localStorage.getItem('token')
    let initialToken ; 
    if (tokenData){
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken) 

    const userIsLoggedIn = !!token; // converts it from true or false and from false to True

    // we add the useCallback on logoutHandler method so that we can call in effect once
    const logoutHandler = useCallback(() => {
        setToken(null)
        localStorage.removeItem('token'); //removeItem from local storage
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token); //if you want store an object you have to convert it to json
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);
        
        logoutTimer = setTimeout(logoutHandler, remainingTime); // logs the use out when time arrives
        // setTimeout(logoutHandler, 3000); // logout in 3 sec
    }

    useEffect(() => 
    {
        if (tokenData){
            console.log(tokenData.duration)
            logoutTimer = setTimeout(loginHandler, tokenData.duration);
        }
    },[tokenData, loginHandler]
    );

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}> 
            {props.children} 
        </AuthContext.Provider>
    );
};

export default AuthContext