import io from "socket.io-client";

const ON_FRAME_STEP = "ON_FRAME_STEP";
const ON_PDF_FRAME_STEP = "ON_PDF_FRAME_STEP";
const ON_PDF_GENERATING = "ON_PDF_GENERATING";
const ON_PDF_DOWNLOADING = "ON_PDF_DOWNLOADING";

export default class WebSocketManager {
  static init(cb) {
    this.socket = io({ path: "/ws" });
    this.socket.on("connect", cb);
  }

  static onFrameStep(cb) {
    this.socket.on(ON_FRAME_STEP, cb);
  }

  static onPdfFrameStep(cb) {
    this.socket.on(ON_PDF_FRAME_STEP, cb);
  }

  static onPdfDownloading(cb) {
    this.socket.on(ON_PDF_DOWNLOADING, cb);
  }

  static onPdfGenerating(cb) {
    this.socket.on(ON_PDF_GENERATING, cb);
  }

  static off() {
    this.socket.off(ON_FRAME_STEP);
    this.socket.off(ON_PDF_FRAME_STEP);
  }
}
