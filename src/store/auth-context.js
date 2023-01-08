import React, { useState } from 'react';

const AuthContext = React.createContext({
    token:'',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    //local storage is synchronous
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken) 

    const userIsLoggedIn = !!token; // converts it from true or false and from false to True

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token); //if you want store an object you have to convert it to json
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token'); //removeItem from local storage
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