import { param } from 'jquery';
import axiosClient from './axiosClient'

const studentApi = {
    getAll : (params) => {  
        const url = '/api/v1/students';
        return axiosClient.get(url, { params });
    },
    getById : (params) => {  
        const url = `/api/v1/students/${params}`;
        axiosClient.get(url);
    },
    create: (params) => {
        const url = '/api/v1/students';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/api/v1/students';
        return axiosClient.put(url, params);
    },
}
export default studentApi;