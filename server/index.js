const env = require("./env");
const hummus = require("hummus");
const path = require("path");
const session = require("express-session");
const express = require("express");
const http = require("http");
const passport = require("passport");
const cors = require("cors");
const fs = require("fs");
const RateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  path: "/ws"
});
const router = express.Router();

const FigmaClient = require("./figmaClient");
const { convertFrameToPdf } = require("./pdfExport");

const AUTH_CONFIG = {
  client_id: process.env.FIGMA_CLIENT_ID,
  client_secret: process.env.FIGMA_CLIENT_SECRET,
  redirect_uri: "http://localhost:8080/api/auth/callback",
  scope: "file_read",
  state: "state"
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use("/api", router);

router.post("/files/:key/export", async (req, res) => {
  try {
    if (req.body.file.frames.length == 0) throw "No frame selected";

    const exportOptions = {
      name: req.body.file.name,
      version: req.body.file.version
    };

    res.writeHead(200, { "Content-Type": "application/pdf" });

    let pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res), {
      version: hummus.ePDFVersion15
    });

    for (let frame in req.body.file.frames) {
      //don't export pdf in parallel to avoid increasing the memory

      let frameItem = req.body.file.frames[frame];

      try {
        pdfWriter.appendPDFPagesFromPDF(
          new hummus.PDFRStreamForBuffer(
            await convertFrameToPdf(frameItem.imageUrl, frame, exportOptions)
          )
        );
        notifyUser(req.headers["socket-id"], "ON_PDF_FRAME_STEP", {
          action: "PROCESSED"
        });
      } catch (e) {
        notifyUser(req.headers["socket-id"], "ON_PDF_FRAME_STEP", {
          action: "SKIP",
          frame: frameItem
        });
      }
    }

    pdfWriter.end();
    res.end();
  } catch (e) {
    console.log(e);
    res.status(400).send("An error occured during the export");
  }
});

router.get("/images/:key", async (req, res) => {
  try {
    notifyUser(req.headers["socket-id"], "ON_FRAME_STEP", {
      step: "Fetching Frames"
    });

    let frames = await FigmaClient.getFrames(
      req.params.key,
      req.headers["access_token"]
    );
    notifyUser(req.headers["socket-id"], "ON_FRAME_STEP", {
      step: "Creating Images"
    });
    res.send(
      await FigmaClient.getFramesWithImages(
        frames,
        req.params.key,
        req.headers["access_token"]
      )
    );
  } catch (e) {
    switch (e.response.status) {
      case 429:
        res.status(429).send("Too many request, try oauth");
        break;
      case 404:
        res.status(404).send("The file key is invalid");
        break;
      case 403:
        res.status(403).send("The token is invalid");
        break;
      default:
        res.status(400).send("An error occured");
    }
  }
});

router.get("/auth", (req, res) => {
  res.redirect(
    `https://www.figma.com/oauth?client_id=${
      AUTH_CONFIG.client_id
    }&redirect_uri=${AUTH_CONFIG.redirect_uri}&scope=${
      AUTH_CONFIG.scope
    }&state=${AUTH_CONFIG.state}&response_type=code
    `
  );
});

router.get("/auth/callback", async (req, res) => {
  try {
    const response = await axios.post(
      `https://www.figma.com/api/oauth/token?client_id=${
        AUTH_CONFIG.client_id
      }&client_secret=${AUTH_CONFIG.client_secret}&redirect_uri=${
        AUTH_CONFIG.redirect_uri
      }&code=${req.query.code}&grant_type=authorization_code`
    );

    res.cookie("access_token", response.data.access_token);
    res.cookie("expires_in", response.data.expires_in);
    res.cookie("refresh_token", response.data.refresh_token);
    res.redirect("/");
  } catch (e) {}
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

app.use((req, res, next) => {
  res.status(404).send({
    message: "Not found"
  });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT}`);
});

const notifyUser = (socketId, eventName, payload = {}) => {
  if (io.sockets.connected[socketId]) {
    io.sockets.connected[socketId].emit(eventName, payload);
  }
};
