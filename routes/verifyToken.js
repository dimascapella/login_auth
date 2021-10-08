const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = function(req, res, next){
    let token = req.headers.authorization;
    if(!token){
        return res.status(401).json('Access Denied')
    }

    try{
        token = token.split(' ')[1]
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    }catch(error){
        res.status(400).send('Invalid Token')
    }
}