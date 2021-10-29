const axios = require('axios');
const express = require('express')
const router = express.Router()
const registry = require('./registry.json')

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

module.exports = router