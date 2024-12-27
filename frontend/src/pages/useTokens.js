import { useState } from 'react';

function useToken() {


    function getToken() {
        const userToken = localStorage.getItem('access_token');
        return userToken && userToken;
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('access_token', userToken);
        setToken(userToken);
    };

    function removeToken() {
        localStorage.removeItem("access_token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken
        
    }

}

export default useToken;
