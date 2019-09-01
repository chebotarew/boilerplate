
const CatController = {
    get: (req, res) => {
        res.send(' GET Cats')
    },
    post: (req, res) =>{
        res.send('POST Cats')
    }
}

module.exports = CatController