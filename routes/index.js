const axios = require('axios');
const express = require('express')
const router = express.Router()
const registry = require('./registry.json')
const fs = require('fs')

router.all('/:apiName/:path', (req, res) => {
    console.log(req.params.apiName);

    // Forward request to the corresponding API Server
    if(registry.services[req.params.apiName]) {
        axios({
            method: req.method,
            url: registry.services[req.params.apiName].url + req.params.path,
            headers: req.headers,
            data: req.body
        }).then(
            (response) => {
                res.send(response.data)
            }
        );
    } else {
        res.send('API does not exists!!!');
    }
})

router.post('/register', (req, res) => {
    const registrationInfo = req.body

    // Determine the URL to the API Server
    registrationInfo.url = `${registrationInfo.protocol}://${registrationInfo.host}:${registrationInfo.port}/`
    
    registry.services[registrationInfo.apiName] = { ...registrationInfo }

    fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
        if(error) {
            res.send(`Could not register ${registrationInfo.apiName} \n ${error}`)
        } else {
            res.send(`Successfully registered API: ${registrationInfo.apiName}`)
        }
    })
})

module.exports = router