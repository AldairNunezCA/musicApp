const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    router.send('Hola como estan')
})

module.exports = router