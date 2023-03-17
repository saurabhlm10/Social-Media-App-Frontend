import axios from "axios"
import Cookies from "js-cookie";

export const deleteFromAPI = async (postId, imageName) => {
    try {
        const token = Cookies.get('jwt_token')

        const response = await axios.delete(`/api/deletepost/${postId}/${imageName}`,
            { headers: { token } }
        );

        return response;

    } catch (error) {
        console.log(error)
    }
}