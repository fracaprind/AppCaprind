import axios from "axios";

const api = axios.create({
 //   baseURL: 'http://localhost:3333'
    baseURL: 'http://192.168.0.6:3333'
  //  baseURL: 'http://157.245.95.64'
});

export default api;