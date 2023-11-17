const AWS = require('aws-sdk');
const jwt_decode = require('jwt-decode');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const credentials = require('./aws_credentials');
let cognitoAttributeList = [];


var poolData = {
  UserPoolId: 'us-east-1_SC87tvKD5', 
  ClientId: '20m548cljlhu9fm9md1k1a0hbn'
}

// const poolData = {
//   UserPoolId: credentials.user_pool_id,
//   ClienteId: credentials.client_id
// }





const attributes = (key, value) => { 
    return {
      Name : key,
      Value : value
    }
};

function setCognitoAttributeList(email, agent) {
 
    let attributeList = [];
    attributeList.push(attributes('email',email));
    attributeList.forEach(element => {
      cognitoAttributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(element));
    });
}

function getCognitoAttributeList() {
    return cognitoAttributeList;
  }
  
  function getCognitoUser(email) {
    const userData = {
      Username: email,
      Pool: getUserPool()
    };
    return new AmazonCognitoIdentity.CognitoUser(userData);
  }
  
  function getUserPool() {
    console.log(poolData);

    try {
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        console.log("User Pool created successfully:", userPool);
        return userPool;
    } catch (error) {
        console.error("Error creating User Pool:", error);
        throw error; // throw the error to handle it appropriately in the calling code
    }
}

  
  function getAuthDetails(email, password) {
    var authenticationData = {
      Username: email,
      Password: password,
     };
    return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  }
  
  function initAWS (region = credentials.region, identityPoolId = credentials.identity_pool) {
   
    AWS.config.region = region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      
      IdentityPoolId: identityPoolId,
    });

  }
  
  function decodeJWTToken(token) {
    const {  email, exp, auth_time , token_use, sub} = jwt_decode(token.idToken);
    return {  token, email, exp, uid: sub, auth_time, token_use };
  }
  
  module.exports = {
    initAWS,
    getCognitoAttributeList,
    getUserPool,
    getCognitoUser,
    setCognitoAttributeList,
    getAuthDetails,
    decodeJWTToken,
  }

