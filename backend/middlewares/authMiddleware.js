const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const fs = require('fs');
const path = require('path');

const User = require('../models/user')

const pathToPubKey = path.join(__dirname, '..', 'utils', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');


const protect = asyncHandler(async (req,res,next) => {
    let token

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            // get token from the header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const verify = jwt.verify(token,PUB_KEY,{ algorithms: ['RS256'] })

            // get user from the token
            req.user = await User.findOne({
                attributes: ['id','username','email','confirmed'],
                where: {
                    id: verify.id
                }
            })

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    }
    else{
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }