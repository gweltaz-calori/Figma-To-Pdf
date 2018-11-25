const https = require("https");
const uuid = require("node-uuid");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const crypto = require("crypto");

module.exports = {
  async exportToPdf(
    body,
    { onFrame = null, onFrameError = null, onGenerating = null } = {}
  ) {
    return new Promise(async resolve => {
      try {
        const frameUrls = body.file.frames;
        const maxWidth = frameUrls.reduce((maxWidth, frame) => {
          return frame.bounds.width > maxWidth ? frame.bounds.width : maxWidth;
        }, 0);
        const maxHeight = frameUrls.reduce((maxHeight, frame) => {
          return frame.bounds.height > maxHeight
            ? frame.bounds.height
            : maxHeight;
        }, 0);
        const height = frameUrls.reduce((height, frame) => {
          return height + frame.bounds.height;
        }, 0);

        let rootSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${maxWidth}" height="${height}" viewBox="0 0 ${maxWidth} ${height}">`;

        let translateY = 0;
        let index = 0;
        const framePromises = [];
        for (let frame of frameUrls) {
          const framePromise = this.getFrameSvgContent(
            frame.imageUrl,
            translateY,
            index,
            frame.bounds.height
          );

          framePromises.push(framePromise);

          framePromise
            .then(() => {
              onFrame && onFrame();
            })
            .catch(() => {
              onFrameError && onFrameError();
            });

          index++;
          translateY += frame.bounds.height;
        }

        let frameSvgs = await Promise.all(framePromises);

        frameSvgs = frameSvgs.sort((a, b) => a.index - b.index);

        for (let frameSvg of frameSvgs) {
          rootSvg += frameSvg.body;
        }

        rootSvg += "</svg>";

        const uuid = crypto.randomBytes(16).toString("hex");
        const pathName = path.resolve(__dirname, `./exports/${uuid}.svg`);

        onGenerating && onGenerating();

        fs.writeFile(pathName, rootSvg, async err => {
          browser = await puppeteer.launch({
            headless: true,
            args: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-gpu",
              "--hide-scrollbars",
              "--disable-web-security"
            ]
          });
          const page = await browser.newPage();
          await page.goto(`file:///${pathName}`);
          const pdf = await page.pdf({
            displayHeaderFooter: false,
            printBackground: true,
            pageRanges: "",
            height: maxHeight / 3.7795275591 + "mm",
            width: maxWidth / 3.7795275591 + "mm",
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          });

          await browser.close();

          fs.unlink(pathName, () => {});
          resolve(pdf);
        });
      } catch (e) {}
    });
  },
  getFrameSvgContent(frameUrl, y, index, height) {
    return new Promise(resolve => {
      https.get(frameUrl, response => {
        let body = "";
        response.on("data", data => {
          body += data;
        });

        response.on("end", () => {
          body = body.slice(0, 5) + `y="${y}" ` + body.substring(5);
          let idRegex = new RegExp('id="([a-zA-Z0-9_]+)"', "gm");
          let match = idRegex.exec(body);
          while (match != null) {
            body = body.replace(new RegExp(match[1], "g"), match[1] + index);
            match = idRegex.exec(body);
          }
          resolve({ body, index, height });
        });
      });
    });
  }
};
