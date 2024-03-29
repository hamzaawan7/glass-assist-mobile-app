import axios from "axios";

const instance = axios.create({
    baseURL: "https://ms.glassassistuk.co.uk",
    withCredentials: true,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
});

// Request interceptor. Runs before your request reaches the server
const onRequest = async (config) => {
    // If http method is `post | put | delete` and XSRF-TOKEN cookie is 
    // not present, call '/sanctum/csrf-cookie' to set CSRF token, then 
    // proceed with the initial response
    if ((
        config.method == 'post' ||
        config.method == 'put' ||
        config.method == 'delete'
    )) {
        await setCSRFToken();
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
