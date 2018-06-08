import axios from "axios";
import WebSocketManager from "@/js/utils/ws";
import { clamp } from "@/js/utils/math";
import store from "@/store";

const sortFramesByPosition = frames => {
  let rows = [];

  for (let frame of frames) {
    let row = rows.find(row => {
      let frameBounds = {
        top: frame.bounds.y,
        bottom: frame.bounds.y + frame.bounds.height
      };

      let rowBounds = {
        top: row.bounds.y,
        bottom: row.bounds.y + row.bounds.height
      };

      return (
        (frameBounds.top >= rowBounds.top &&
          frameBounds.top <= rowBounds.bottom) ||
        (frameBounds.bottom <= rowBounds.bottom &&
          frameBounds.bottom >= rowBounds.top)
      );
    });

    if (row) {
      row.children.push(frame);
    } else {
      rows.push({
        children: [frame],
        name: frame.name,
        bounds: frame.bounds
      });
    }
  }

  rows = rows.sort((a, b) => a.bounds.y - b.bounds.y);

  let sortedFrames = [];
  for (let row of rows) {
    let sortedRow = row.children.sort((a, b) => a.bounds.x - b.bounds.x);
    sortedFrames = sortedFrames.concat(sortedRow);
  }

  return sortedFrames;
};

export const createFramePages = async id => {
  const headers = { "Socket-Id": WebSocketManager.socket.id };

  if (store.getters.user.access_token)
    headers["access_token"] = store.getters.user.access_token;

  let response = await axios({
    method: "GET",
    url: `/api/images/${id}`,
    headers
  });

  return sortFramesByPosition(response.data);
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

export const logout = async token => {
  const response = await axios.delete(
    `/api/auth/${store.getters.user.access_token}`
  );

  return response.data;
};
