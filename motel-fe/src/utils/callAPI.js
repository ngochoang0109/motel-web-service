import axios from 'axios';
import { API_BASE_URL } from '../constants/API';

const callAPI = (endpoint, method = "GET", data) => {
    return axios({
        method: method,
        url: `${API_BASE_URL}/${endpoint}`,
        data: data
    })
        .catch((err) => {
            console.log(err);
        });
}

export default callAPI;