const express = require('express')
const app = express()

const {getFilePages,exportPages,getImagesContent,createPdf} = require('./utils')

app.use(express.static('public'));

app.get('/',(req,res) => res.sendFile(path.resolve(__dirname,'./public/index.html')))

app.get('/export/:key', async(req, res) => {
    try {
        let pages = await getFilePages(req.params.key)
        let images = await exportPages(pages,req.params.key)
        let svgContent = await getImagesContent(pages)
        createPdf(pages,res)
        

        res.setHeader('Content-Type', 'application/pdf');
        
    }
    catch(e) {
        res.status(400).send({
            message : "Invalid File"
        })
    }
    
    
})

app.listen(8080)