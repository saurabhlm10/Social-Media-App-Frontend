import axios from "axios"
import Cookies from "js-cookie";

export const deleteFromAPI = async (query) => {
    try {
        const token = Cookies.get('jwt_token')

        const response = await axios.delete(query,
            { headers: { token } }
        );

        return response;

    } catch (error) {
        console.log(error)
    }
}