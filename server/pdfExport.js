const https = require("https");
const uuid = require("node-uuid");
const path = require("path");
const fs = require("fs");
const Inkscape = require("inkscape");

module.exports = {
  convertFrameToPdf: (frameUrl, index, opts) => {
    let buffer = [];
    return new Promise((resolve, reject) => {
      const svgToPdfConverter = new Inkscape([
        "--export-pdf",
        `--export-pdf-version=${opts.version}`
      ]);
      https
        .get(frameUrl, response => {
          response
            .pipe(svgToPdfConverter)
            .on("data", chunk => {
              buffer.push(chunk);
            })
            .on("end", () => {
              resolve(Buffer.concat(buffer));
              buffer = null;
            });
        })
        .on("error", () => reject("Image server is down"));
    });
  }
};
