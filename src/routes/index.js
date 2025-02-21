const express = require('express')
const router = express.Router();
const fs = require('fs').promises;

async function readRoutes() {
    try {
        const files = await fs.readdir(__dirname);
        console.log({files});
        files.forEach((file) =>{
            const routeComplete = file.split('.').shift();
            const route = routeComplete.split('_').shift()
            if (route !== 'index') {
                console.log(`loading route ${route}`)
                router.use(`/${route}`, require(`./${file}`))
            }
        })
    } catch (error) {
        console.log('Error reading directory: ', error)
    }
}

readRoutes();

module.exports = router;