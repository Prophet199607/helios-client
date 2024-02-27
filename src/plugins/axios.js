import axios from 'axios';

const api = axios.create({
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Token')
    },
    baseURL: "http://124.43.6.45:4545/api",
});

export default api;