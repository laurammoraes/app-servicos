const { response } = require('express');
const credentials = require('../config/aws_credentials')
const dynamo = require('../config/aws_dynamodb')
const jwt = require ('jsonwebtoken');
var aws = require('aws-sdk');


async function verifyToken(req, res, next){ 
    const token =req.headers.accesstoken
    
    if(!token){
        response.status(401).end;
    } 

    let decodedJwt; 
    try {
        decodedJwt = jwt.decode(token);
        const user = await dataUser(decodedJwt.username)
        req.userId = user
        
        next()
    } catch (error) {
        console.log('Error decoding JWT:', error)
        response.status(401).end();
    }
   

}

async function dataUser(decodedJwt){
    dynamo.initDynamo();
    const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();

    const params = {
        UserPoolId: credentials.userPoolId,
        Username:decodedJwt,
    };
    

    try {
        const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
       
        const response = {
            email: user.UserAttributes[4].Value,
            username: user.Username
        } 
       
        
        return response;
    } catch (error) {
       
        throw new Error(error);
    }
}

module.exports = {
    verifyToken,
}