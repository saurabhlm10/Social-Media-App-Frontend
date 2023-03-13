import axios from "axios"

export const postToAPI = async (query, info, headers) => {
    let response;

    response = headers ? await axios.post(`${query}`, info, { headers }) : await axios.post(`${query}`, info)

    return response;
}