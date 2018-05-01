const express = require('express')
const app = express()
const fs = require('fs')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('.env'))
for (var k in envConfig) {
  process.env[k] = envConfig[k]
}

const pdfCreator = require('./utils')

app.use(express.static('public'));

app.get('/',(req,res) => res.sendFile(path.resolve(__dirname,'./public/index.html')))

app.get('/export/:key', async(req, res) => {
    try {
        let pages = await pdfCreator.getFilePages(req.params.key)
        let images = await pdfCreator.exportPages(pages,req.params.key)
        let svgContent = await pdfCreator.getImagesContent(pages)
        pdfCreator.createPdf(pages,res)
        

        res.setHeader('Content-Type', 'application/pdf');

        
        
    }
    catch(e) {
        console.log(e)
        res.status(400).send({
            message : "Invalid File"
        })
    }
    
    
})

app.listen(8088)