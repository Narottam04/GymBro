const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { transporter } = require('../config/nodeMailer');

const User = require('../models/user')
const { generateToken, verifyToken, registerToken } = require('../utils/issueJWT')

// @desc    Register new users
// @route   POST /api/users
// @access  PUBLIC
const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    // check if user exists
    const userExists = await User.findOne({
        where: {email}
    })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }

    // hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password,salt)

    // create User
    const user = await User.create({
        username: name,
        email,
        password: hashedPassword,
    })

    if(user) {
        registerToken(user.id,user.email)
        res.json({
            id: user.id,
            username: user.username,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc    confirm user email
// @route   POST /api/users/confirmation/:token
// @access  PUBLIC
const confirmUserToken = asyncHandler(async(req,res) => {
    const token = req.params.token

    const verify = verifyToken(token)

    if(verify) {
        try {
            await User.update({confirmed: true}, {where:{
                id: verify.id
            }})
            res.status(200).json({message: "User confirmed successfully."})

        } catch (error) {
            res.status(400)
            throw new Error('Could not verify user, Please try again! ')
        }
    }else{
        res.status(400)
        throw new Error('Invalid Token.')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  PUBLIC
const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    // check for user email
    const user = await User.findOne({
        where: {email}
    })

    if(user && !user.confirmed) {
        res.status(400)
        throw new Error('Please confirm your email to login.')
    }

    if(user && (await bcrypt.compare(password,user.password))) {
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})   

// @desc    Reset user password
// @route   POST /api/users/forgotPassword
// @access  Public

const forgotPassword = asyncHandler(async (req,res) => {
    const email = req.body.email
    if(!email){
        res.status(400)
        throw new Error('Please add all fields.')
    }

    // check for user email
    const user = await User.findOne({
        where: {email}
    })

    if(!user) {
        res.status(400)
        throw new Error('Invalid credentials.')
    }

    // TODO: Make this a one-time-use token by using the user's
    // current password hash from the database, and combine it
    // with the user's created date to make a very unique secret key!

    const secret = `${user.password}-${user.createdAt}`


    const payload = {
        email: user.email,
        id: user.id
    }

    const token = jwt.sign(payload, secret, {
        expiresIn: '15m'
    })

    const url = `http://localhost:5000/api/users/passwordReset/${user.id}/${token}`

    const mail = await transporter.sendMail({
        from: '"Narottam Sahu" <webdripdev@gmail.com>',
        to: email,
        subject: 'GymBro - Account Password Reset',
        html: `Please click on this url and fill the necessary details to change your password: <a href="${url}">${url}</a>`
    })

    res.status(200).json({status: "Success", messageId: mail.messageId })
})

// @desc    Reset User password
// @route   GET /api/users/passwordReset/:id/:token
// @access  Public
const viewPasswordResetPage = asyncHandler(async(req,res,next) => {
    const {id,token} = req.params

    // find user using user id
    const user = await User.findOne({
        where: {id}
    })

    if(!user) {
        res.status(400)
        throw new Error('Invalid credentials.')
    }

    const secret = `${user.password}-${user.createdAt}`

    const verify = jwt.verify(token,secret)

    res.render('reset-password', {email: user.email})
})

// @desc    Reset User password
// @route   POST /api/users/passwordReset/:id/:token
// @access  Public
const resetPassword = asyncHandler(async(req,res,next) => {
    const {id, token} = req.params
    const {password,password2} = req.body

    // find user using user id
    const user = await User.findOne({
        where: {id}
    })

    if(!user) {
        res.status(400)
        throw new Error('Invalid credentials.')
    }

    const secret = `${user.password}-${user.createdAt}`

    const verify = jwt.verify(token,secret)


    // hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password,salt)

    const updateUserPassword = await User.update({password: hashedPassword}, {where:{
        id: verify.id,
        email: verify.email
    }})

    res.render('reset-password-success')
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req,res) => {
    res.status(200).json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    confirmUserToken,
    forgotPassword,
    viewPasswordResetPage,
    resetPassword
}