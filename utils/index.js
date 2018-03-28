const axios = require('axios')
const fs = require('fs')
const blobStream = require('blob-stream');
const PDFDocument  = require('pdfkit')
const SVGtoPDF = require('svg-to-pdfkit');
const ACCESS_TOKEN = "<YOUR-TOKEN>"

let axiosInstance = axios.create({
    baseURL : "https://api.figma.com/v1/",
    headers : {
        "X-Figma-Token" : ACCESS_TOKEN
    }
})
module.exports = {
    async getFilePages(key) {
        let response = await axiosInstance.get(`files/${key}`)
        return response.data.document.children[0].children.sort((a,b) => parseInt(a.name) - parseInt(b.name))
    },
    async exportPages(pages,key) {
        for(let page of pages) {
            let response = await axiosInstance.get(`images/${key}`,{
                params : {
                    ids : page.id,
                    format : "svg"
                }
            })
    
            page.imageUrl = Object.values(response.data.images)[0]
        }
    },
    async getImagesContent(pages) {
        for(let page of pages ) {
            let response = await axios.get(page.imageUrl)
            page.svgContent = response.data
        }
    },
    async createPdf(pages,res) {
        let doc = new PDFDocument({compress: false,size : [pages[0].absoluteBoundingBox.width * 0.75,pages[0].absoluteBoundingBox.height* 0.75]})
        let stream = doc.pipe(res);
        SVGtoPDF(doc, pages[0].svgContent , 0, 0);
        pages.shift()
        for(let page of pages) {
            doc.addPage({size : [page.absoluteBoundingBox.width* 0.75,page.absoluteBoundingBox.height* 0.75]})
            SVGtoPDF(doc, page.svgContent , 0, 0);
        }

    
        doc.end();
    }
}
