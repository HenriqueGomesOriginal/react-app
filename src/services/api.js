import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hav4.azurewebsites.net',
})

export default api;