const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        posts:{
            title: 'Jiya',
            desc: 'Hello Jiya'
        }
    })
})

module.exports = router