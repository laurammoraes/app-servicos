const { response } = require('express');
const credentials = require('../config/aws_credentials')
const jwkToPem = require ('jwk-to-pem');
const jwt = require ('jsonwebtoken');
const fetch = require ('node-fetch');

let pems = []; 

var dataAWS = {
    region: credentials.region,
    userPoolId: credentials.userPoolId
}

function verifyToken(req, res, next){
    const token = req.body.accessToken
    if(!token){
        response.status(401).end;
    } 

    let decodedJwt; 
    try {
        decodedJwt = jwt.decode(token); 
        req.userId = decodedJwt.username
        next()
    } catch (error) {
        console.log('Error decoding JWT:', error)
        response.status(401).end();
    }
   

}

module.exports = {
    verifyToken,
}