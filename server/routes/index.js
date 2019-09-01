
const express = require('express')
const router = express.Router()
const CatRouter = express.Router()

router.use('/cat', CatRouter)

CatRouter.get('/', (req, res) => {
    res.send(' GET Cats')
})

CatRouter.post('/', (req, res) => {
    res.send(' POST Cats')
})

module.exports = router