import axios from "axios"
import Cookies from "js-cookie";

export const putToAPI = async (query) => {
    const token = Cookies.get('jwt_token')

    const data = {}

    const headers = {
        token: token
    }
    const response = await axios.put(query, data, {headers})

    return response
}