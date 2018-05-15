const https = require('https')
const uuid = require('node-uuid');
const path = require('path')
const fs = require('fs')
const Inkscape = require('inkscape')

module.exports = {
    convertFrameToPdf: (frameUrl, index, opts) => {
        return new Promise((resolve, reject) => {
            const exportedPdfUrl = `${path.resolve(__dirname, './temp')}/${uuid.v4()}.pdf`
            const svgToPdfConverter = new Inkscape(['--export-pdf', `--export-pdf-version=${opts.version}`]);
            https.get(frameUrl, response => {

                response
                    .pipe(svgToPdfConverter)
                    .pipe(fs.createWriteStream(exportedPdfUrl))
                    .on('finish', () => resolve(exportedPdfUrl))
            })
        })
    }
} 