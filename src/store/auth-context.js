import React, { useState } from 'react';

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

export const AuthContextProvider = (props) => {
    //local storage is synchronous
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken) 

    const userIsLoggedIn = !!token; // converts it from true or false and from false to True

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token'); //removeItem from local storage
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token); //if you want store an object you have to convert it to json

        const remainingTime = calculateRemainingTime(expirationTime);
        setTimeout(logoutHandler, remainingTime); // logs the use out when time arrives
        // setTimeout(logoutHandler, 3000); // logout in 3 sec
    }

    

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