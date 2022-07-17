const jwt = require('jsonwebtoken')

const fs = require('fs');
const path = require('path');
const { transporter } = require('../config/nodeMailer');

const pathToKey = path.join(__dirname, 'id_rsa_priv.pem');
const pathToPubKey = path.join(__dirname,  'id_rsa_pub.pem');

const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');


// generate token for registration
const registerToken = (id,email) => {
  return jwt.sign({ id }, PRIV_KEY, {
    expiresIn: '1d',
    algorithm: 'RS256'
  },(err,emailToken) => {
    const url = `http://localhost:5000/api/users/confirmation/${emailToken}`

    transporter.sendMail({
      from: '"GymBro" <webdripdev@gmail.com>',
      to: email,
      subject: 'Confirm email',
      html: `Please click on this url to confirm your email: <a href="${url}">${url}</a>`
    })
  })
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, PRIV_KEY, {
      expiresIn: '30d',
      algorithm: 'RS256'
    })
}

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token,PUB_KEY,{ algorithms: ['RS256'] })
}

module.exports = {
    generateToken,
    registerToken,
    verifyToken
}