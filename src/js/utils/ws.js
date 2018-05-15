import io from 'socket.io-client'
export default class WS {
    static init() {
        this.connection = io('http://localhost:3002');;
    }
    static fetchFile(data) {
        this.connection.emit("fetchFrame", data);
    }

    static onFetchedFrameStep(cb) {
        this.connection.on('fetchedFrameStep', cb)
    }

    static onPdfContent(cb) {
        this.connection.on('pdfContent', cb)
    }

    static onPdfStep(cb) {
        this.connection.on('pdfStep', cb)
    }

    static createPdf(data) {
        this.connection.emit("createPdf", data);
    }

    static onComplete(cb) {
        this.connection.on('complete', cb)
    }

    static off() {
        this.connection.off('fetchedFrameStep')
        this.connection.off('complete')
        this.connection.off('createPdf')
    }
}