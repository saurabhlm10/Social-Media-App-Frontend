import axios from "axios"

export const getFromAPI = async (query) => {
    try {
        const response = await axios.get(`${query}`)

        return response

    } catch (error) {
        console.log(error)
    }
}   