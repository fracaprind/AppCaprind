import axios from "axios";

const api = axios.create({
 //   baseURL: 'http://localhost:3333'
    baseURL: 'http://192.168.0.8:3333'
    //baseURL: 'http://caprind.myftp.org:3333'
});

export default api;