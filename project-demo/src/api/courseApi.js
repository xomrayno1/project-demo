import axiosClient from './axiosClient'

const courseApi = {
    getAll : (params) => {  
        const url = '/api/v1/courses';
        return axiosClient.get(url, { params });
    },
    getById : (params) => {  
        const url = `/api/v1/courses/${params}`;
        return axiosClient.get(url);
    },
    deleteById : (params) => {  
        const url = `/api/v1/courses/${params}`;
        return axiosClient.delete(url);
    },
    create : (params) => {  
        const url = `/api/v1/courses`;
        return axiosClient.post(url, params);
    },
    update : (params) => {  
        const url = `/api/v1/courses`;
        return axiosClient.put(url, params);
    },
}
export default courseApi;