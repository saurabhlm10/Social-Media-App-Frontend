import axios from "axios"

export const putToAPI = async (query) => {
    const response = await axios.put(query)

    return response
}