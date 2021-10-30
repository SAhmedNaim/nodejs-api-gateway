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

    if(apiAlreadyExists(registrationInfo)) {
        res.send(`Configuration already exists for the API ${registrationInfo.apiName} at ${registrationInfo.url}`)
    } else {
        // Determine the URL to the API Server
        registrationInfo.url = `${registrationInfo.protocol}://${registrationInfo.host}:${registrationInfo.port}/`
        
        registry.services[registrationInfo.apiName].push({ ...registrationInfo })

        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if(error) {
                res.send(`Could not register ${registrationInfo.apiName} \n ${error}`)
            } else {
                res.send(`Successfully registered API: ${registrationInfo.apiName}`)
            }
        })
    }
})

router.post('/unregister', (req, res) => {
    const registrationInfo = req.body

    if(apiAlreadyExists(registrationInfo)) {
        const index = registry.services[registrationInfo.apiName].findIndex((instance) => {
            return registrationInfo.url === instance.url
        })

        registry.services[registrationInfo.apiName].splice(index, 1)

        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if(error) {
                res.send(`Unable to unregister ${registrationInfo.apiName} \n ${error}`)
            } else {
                res.send(`Successfully Unregistered ${registrationInfo.apiName} \n`)
            }
        })
    } else {
        res.send(`Configuration does not exists for ${registrationInfo.apiName} at ${registrationInfo.url}`)
    }
})

const apiAlreadyExists = (registrationInfo) => {
    let exists = false

    registry.services[registrationInfo.apiName].forEach(instance => {
        if(instance.url === registrationInfo.url) {
            exists = true
            return
        }
    })

    return exists
}

module.exports = router