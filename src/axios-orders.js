
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-186bb.firebaseio.com/'
})

export default instance;