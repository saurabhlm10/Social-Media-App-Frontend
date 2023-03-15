import axios from "axios"
import Cookies from "js-cookie";

export const postToAPI = async (query, info, headers) => {
    let response;

    const token = Cookies.get('jwt_token')

    if(token){
        headers.token = token
    }


    response = headers ? await axios.post(`${query}`, info, { headers }) : await axios.post(`${query}`, info)

    return response;
}