const axios = require('axios')
const {performance}  = require('perf_hooks')
const fs = require('fs')
const blobStream = require('blob-stream');
const PDFDocument  = require('pdfkit')
const SVGtoPDF = require('svg-to-pdfkit');


let axiosInstance = axios.create({
    baseURL : "https://api.figma.com/v1/",
    headers : {
        "X-Figma-Token" : process.env.ACCESS_TOKEN
    }
})

const pdfCreator = {
    async getFilePages(key) {
        let start = performance.now()
        let response = await axiosInstance.get(`files/${key}`)
        let end = performance.now()
        
        console.log(`Got file pages in ${end - start} ms`)

        return response.data.document.children[0].children
            .filter(layer => layer.type === "FRAME")
            .sort((a,b) => parseInt(a.name) - parseInt(b.name))
    },
    async exportPages(pages,key) {
        let response = await axiosInstance.get(`images/${key}`,{
            params : {
                ids : pages.map(page => page.id).join(','),
                format : "svg"
            }
        })

        let imagesUrls = Object.values(response.data.images)
        for(let page in pages) {
            pages[page].imageUrl = imagesUrls[page]
        }

        return "ok"
    },
    async getImagesContent(pages) {
        let start = performance.now()
        let imagesPromises = []
        for(let page of pages ) {
            let imagePromise = this.getImageContent(page)
            imagesPromises.push(imagePromise)
        }
        await Promise.all(imagesPromises) 
        let end = performance.now()
        console.log(`Got images content in ${end - start} ms `)
        return "ok"
    },
    async getImageContent(page) {
        let response = await axios.get(page.imageUrl)
        page.svgContent = response.data
        return "content"
    },
    async createPdf(pages,res) {
        const options = {
            assumePt : true
        }
        
        let doc = new PDFDocument({compress: false,size : [pages[0].absoluteBoundingBox.width,pages[0].absoluteBoundingBox.height]})
        let stream = doc.pipe(res);
        SVGtoPDF(doc, pages[0].svgContent , 0, 0,options);
        pages.shift()
        for(let page of pages) {
            doc.addPage({size : [page.absoluteBoundingBox.width,page.absoluteBoundingBox.height]})
            SVGtoPDF(doc, page.svgContent , 0, 0,options);
        }

    
        doc.end();
    }
}

module.exports = pdfCreator
