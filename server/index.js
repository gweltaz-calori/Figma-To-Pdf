const express = require('express')
const app = express()
const router = express.Router();
const fs = require('fs')
const figmaClient = require('./figmaClient')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('.env'))
for (var k in envConfig) {
    process.env[k] = envConfig[k]
}

router.get('/', (req, res) => {
    res.send({
        "message": "Welcome"
    })
})

router.get('/files/:key', async (req, res) => {
    res.send(await figmaClient.getFrames(req.params.key))
})

app.use('/api', router)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Listening on ${process.env.SERVER_PORT}`)
})
