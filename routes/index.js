const axios = require('axios');
const express = require('express')
const router = express.Router()

router.all('/:apiName', (req, res) => {
    console.log(req.params.apiName);

    // Forward request to the corresponding API Server
    axios.get(`http://localhost:3001/${req.params.apiName}`).then((response) => {
        res.send(response.data)
    });
})

module.exports = router