import axios from "axios"
import Cookies from "js-cookie";

export const postToAPI = async (query, info, headers) => {
    let token;

    if (Cookies.get('jwt_token')) {
        token = Cookies.get('jwt_token')
        headers.token = token
    }

    const response = headers ? await axios.post(query, info, { headers }) : await axios.post(`${query}`, info)

    return response;
}