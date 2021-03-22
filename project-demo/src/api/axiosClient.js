  
import axios from 'axios';
import queryString from 'query-string';
import {openNotificationError} from '../common/utils'

const axiosClient = axios.create({
    baseURL:  "http://localhost:8080",  //process.env.REACT_APP_API_URL,
    headers: {
    'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
        // Handle token here ...
        return config;
})
axiosClient.interceptors.response.use((response) => { ///check code
    if (response && response.data) {
        return response.data;
    }
        return response;
    }, (error) => {
    // Handle errors
    openNotificationError('Error',error.response.data.message)
        throw error;
    }
);
 
// axiosClient.defaults.headers = {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//     'Expires': '0',
// }
export default axiosClient;