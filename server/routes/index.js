
const express = require('express')
const CatRouter = require('./api/v1.0/cats')
const router = express.Router()

router.use('/cat', CatRouter)

module.exports = router