const axios = require("axios");
const https = require("https");
const { performance } = require("perf_hooks");

let axiosInstance = axios.create({
  baseURL: "https://api.figma.com/v1/",
  headers: {
    "X-Figma-Token": "1181-e9b3dee4-1ea6-497e-b254-867f6791075e"
  }
});

module.exports = {
  async getFrames(key) {
    let start = performance.now();
    let response = await axiosInstance.get(`files/${key}`);
    return response.data.document.children[0].children.filter(
      layer => layer.type === "FRAME"
    );
  },
  async getFramesWithImages(frames, key) {
    let allImagesFrames = [];

    let start = performance.now();
    let response = await axiosInstance.get(`images/${key}`, {
      params: {
        ids: frames.map(frame => frame.id).join(","),
        format: "svg"
      }
    });

    for (let frame of frames) {
      allImagesFrames.push({
        imageUrl: response.data.images[frame.id],
        id: frame.id,
        name: frame.name,
        enabled: true,
        absoluteBoundingBox: frame.absoluteBoundingBox
      });
    }

    let end = performance.now();

    console.log(`Done Image fetch in ${end - start} ms`);

    return allImagesFrames;
  }
};
