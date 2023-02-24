import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    baseURL: 'http://10.0.2.2:8000',
    withCredentials: true,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
});

// Request interceptor. Runs before your request reaches the server
const onRequest = async (config) => {
    const xsrf = await AsyncStorage.getItem('@app:session');

    // If http method is `post | put | delete` and XSRF-TOKEN cookie is 
    // not present, call '/sanctum/csrf-cookie' to set CSRF token, then 
    // proceed with the initial response
    if ((
        config.method == 'post' ||
        config.method == 'put' ||
        config.method == 'delete'
    ) && !xsrf) {
        setCSRFToken()
            .then(async response => {
                await AsyncStorage.setItem('@app:session', JSON.stringify(response));
            });
    }

    return config;
}

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The 
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
    return instance.get('/sanctum/csrf-cookie'); // resolves to '/api/csrf-cookie'.
}

instance.interceptors.request.use(onRequest, null);

export default instance;
