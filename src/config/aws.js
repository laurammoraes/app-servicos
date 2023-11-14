
const AWS = require('aws-sdk');
const jwt_decode = require('jwt-decode');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const credentials = require('./aws_credentials');
let cognitoAttributeList = [];

//Arquivo de criação e conexão com o serviço do cognito da AWS
//Credenciais para conexão:

const poolData = {
    UserPoolId: credentials.user_pool_id,
    ClienteId: credentials.client_id
}


//Estabelecimento dos atributos do cadastro do novo usuário a ser cadastrado na plataforma

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
  
  function getUserPool(){
    console.log(poolData)
    return new AmazonCognitoIdentity.CognitoUserPool(poolData);
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

