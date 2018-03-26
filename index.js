const express = require('express')
const app = express()

const {getFilePages,exportPages,getImagesContent,createPdf} = require('./utils')

app.get('/export/:url', async(req, res) => {
    let splittedUrl = req.params.url.split('/')
    let key = splittedUrl[splittedUrl.length - 2 ]

    try {
        let pages = await getFilePages(key)
        let images = await exportPages(pages,key)
        let svgContent = await getImagesContent(pages)
        createPdf(pages,res)
        

        res.setHeader('Content-Type', 'application/pdf');
        
    }
    catch(e) {
        console.log(e)
    }
    
    
})

app.listen(8080)