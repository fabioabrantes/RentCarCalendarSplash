import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.3.103.125:3333',
});
    
export {api};