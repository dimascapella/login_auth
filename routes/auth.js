const router = require('express').Router()
const User = require('../model/User')
const { loginValidation, registerValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res, next) => {

    //Joi Validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    // Checking Email in Database
    const existEmail = await User.findOne({email: req.body.email})
    if(existEmail){
        return res.status(400).json('Email Already Used')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    })
    try{
        const saveUser = await user.save();
        res.status(200).json(saveUser)
    }catch(error){
        res.status(400).json(error)
    }
})

router.post('/login', async (req, res, next) => {
    //Joi Validation
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json('Email or Password is Wrong')
    }
    // If Valid
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        return res.status(400).json("Email or Password is Wrong")
    }

    // Create Toker
    const token = jwt.sign({user}, process.env.TOKEN, {
        expiresIn: '604800'
    })
    res.status(200).header("auth-token", "Bearer " + token).send({ "token": token });
})

module.exports = router