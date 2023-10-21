import axios from 'axios';

export const ProductApi = axios.create({
    baseURL : "http://localhost:3000/api",
})