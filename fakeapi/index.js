const express = require('express')
const app = express()

const PORT = 3001

app.use(express.json())
app.get('/fakeapi', (req, res, next) => {
    res.send(`Hello from Fake API Server`)
})

app.listen(PORT, () => {
    console.log(`Hello from fake api server from the PORT ${PORT}`);
})
