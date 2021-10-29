const express = require('express')
const app = express()

const PORT = 3001

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
    console.log(`Hello from fake api server from the PORT ${PORT}`);
})
