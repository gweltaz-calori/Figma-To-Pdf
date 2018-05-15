import axios from 'axios'
import WebSocketManager from "@/js/utils/ws";


export const createFramePages = async (id) => {
    let response = await axios.get(`/api/images/${id}`)
    let res = await axios({
        method: "GET",
        url: `/api/images/${id}`,
        headers: {
            "Socket-Id": WebSocketManager.socket.id
        }

    })
    return response.data
}

export const createPdf = async (file) => {

    let response = await axios({
        url: `/api/files/${file.id}/export`,
        method: 'POST',
        responseType: 'blob',
        data: {
            file
        },
        headers: {
            "Socket-Id": WebSocketManager.socket.id
        }
    })

    return response.data
}