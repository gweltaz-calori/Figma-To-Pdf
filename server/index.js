const express = require('express')
const app = express()
const fs = require('fs')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('.env'))
for (var k in envConfig) {
    process.env[k] = envConfig[k]
}

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(process.env.SERVER_PORT, function () {
    console.log(`Server Listening on ${process.env.SERVER_PORT}`)
})
