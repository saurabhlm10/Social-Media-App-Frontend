import axios from "axios"
import Cookies from "js-cookie";

export const postToAPI = async (query, info, headers) => {

    console.log('postToAPI')
    let response;

    let token;

    if (token) {
        token = Cookies.get('jwt_token')
        headers.token = token
    }

    response = headers ? await axios.post(`${query}`, info, { headers }) : await axios.post(`${query}`, info)

    return response;
}