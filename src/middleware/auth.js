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
        
    } catch (error) {
        console.log('Error decoding JWT:', error)
        response.status(401).end();
    }
    console.log(decodedJwt)
    console.log(!decodedJwt || !decodedJwt.header || !decodedJwt.header.kid)
    if(!decodedJwt || !decodedJwt.header || !decodedJwt.header.kid){
       
        return response.status(401).end();
    }
    
    let kid = decodedJwt.header.kid;
    console.log(kid)
    let pem = pems[kid];
    console.log(pem)

    if (!pem) {
      response.status(401).end()
      return
    }
    jwt.verify(token, pem, function (err, payload) {
      if (err) {
        resp.status(401).end()
        return
      } else {
        next()
      }
    })

}

module.exports = {
    verifyToken,
}