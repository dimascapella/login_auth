const jwt = require('jsonwebtoken')
required('dotenv/config')

// use after login
function auth (req, res, next){
    const token = req.header('auth-header')
    if(!token){
        return res.status(401).json('Access Denied')
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    }catch(error){
        res.status(400).send('Invalid Token')
    }
}

module.export = auth