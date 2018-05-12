import axios from 'axios'

export const getFramePages = async (fileKey) => {
    let response = await axios.get(`/api/files/${fileKey}`)
    return response.data
}