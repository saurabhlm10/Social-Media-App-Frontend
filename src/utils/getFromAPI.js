import axios from "axios"
import Cookies from "js-cookie"

export const getFromAPI = async (query) => {
    try {

        const token = Cookies.get('jwt_token')

        const response = await axios.get(query, {headers: {token}})

        return response

    } catch (error) {
        console.log(error)
    }
}   