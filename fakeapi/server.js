const express = require('express')
const app = express()
const axios = require('axios')

const PORT = 3001
const HOST = "http://localhost"

app.use(express.json())
app.get('/fakeapi', (req, res, next) => {
    res.send(`Hello from Fake API Server`)
})

app.get('/bogusapi', (req, res, next) => {
    res.send(`Bogus API says Hello...`)
})

app.post('/vote', (req, res, next) => {
    res.send(`Thanks for perticiapting on the voting system...`)
})

app.listen(PORT, () => {
    // Register this API to the API Gateway
    axios({
        method: 'POST',
        url: 'http://localhost:3000/register/',
        headers: {'Content-Type': 'application/json'},
        data: {
            apiName: "registrytest",
            host: HOST,
            port: PORT,
            url: `${HOST}:${PORT}`
        }
    }).then((response) => {
        console.log(response.data)
    })

    console.log(`Hello from fake api server from the PORT ${PORT}`);
})
