const env = require("./env");
const hummus = require("hummus");
const path = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const RateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const router = express.Router();

const FigmaClient = require("./figmaClient");
const { convertFrameToPdf } = require("./pdfExport");

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

router.post("/files/:key/export", async (req, res) => {
  try {
    let pdfPaths = [];
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

      pdfWriter.appendPDFPagesFromPDF(
        new hummus.PDFRStreamForBuffer(
          await convertFrameToPdf(frameItem.imageUrl, frame, exportOptions)
        )
      );

      notifyUser(req.headers["socket-id"], "ON_PDF_FRAME_STEP");
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
    let frames = await FigmaClient.getFrames(req.params.key);
    notifyUser(req.headers["socket-id"], "ON_FRAME_STEP", {
      step: "Creating Images"
    });
    res.send(await FigmaClient.getFramesWithImages(frames, req.params.key));
  } catch (e) {
    res.status(400).send("Invalid file key");
  }
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT}`);
});

const notifyUser = (socketId, eventName, payload = {}) => {
  if (io.sockets.connected[socketId]) {
    io.sockets.connected[socketId].emit(eventName, payload);
  }
};
