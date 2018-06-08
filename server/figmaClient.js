const axios = require("axios");
const https = require("https");
const { performance } = require("perf_hooks");

let axiosInstance = axios.create({
  baseURL: "https://api.figma.com/v1/"
});

module.exports = {
  async getFrames(key, accessToken) {
    const headers = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      headers["X-Figma-Token"] = process.env.FIGMA_TOKEN;
    }

    let start = performance.now();
    let response = await axiosInstance({
      method: "GET",
      url: `files/${key}`,
      headers
    });
    return response.data.document.children[0].children.filter(
      layer => layer.type === "FRAME" || layer.type === "GROUP"
    );
  },
  async getFramesWithImages(frames, key, accessToken) {
    let allImagesFrames = [];

    const headers = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      headers["X-Figma-Token"] = process.env.FIGMA_TOKEN;
    }

    let start = performance.now();
    let response = await axiosInstance({
      url: `images/${key}`,
      method: "GET",
      params: {
        ids: frames.map(frame => frame.id).join(","),
        format: "svg"
      },
      headers
    });

    for (let frame of frames) {
      allImagesFrames.push({
        imageUrl: response.data.images[frame.id],
        id: frame.id,
        name: frame.name,
        enabled: true,
        bounds: frame.absoluteBoundingBox
      });
    }

    let end = performance.now();

    console.log(`Done Image fetch in ${end - start} ms`);

    return allImagesFrames;
  }
};
