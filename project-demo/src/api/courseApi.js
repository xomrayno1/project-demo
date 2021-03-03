import axiosClient from './axiosClient'

const courseApi = {
    getAll : (params) => {  
        const url = '/api/v1/courses';
        return axiosClient.get(url, { params });
    }
}
export default courseApi;