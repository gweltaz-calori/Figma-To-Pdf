import axios from "axios";
import WebSocketManager from "@/js/utils/ws";

export const createFramePages = async id => {
  let response = await axios({
    method: "GET",
    url: `/api/images/${id}`,
    headers: {
      "Socket-Id": WebSocketManager.socket.id
    }
  });
  return response.data;
};

export const createPdf = async (file, frames) => {
  let response = await axios({
    url: `/api/files/${file.id}/export`,
    method: "POST",
    responseType: "blob",
    data: {
      file: {
        name: file.name,
        frames,
        version: file.version,
        options: file.options
      }
    },
    headers: {
      "Socket-Id": WebSocketManager.socket.id
    }
  });

  return response.data;
};
