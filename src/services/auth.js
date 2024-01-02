const { config } = require('dotenv');
const AWS = require('aws-sdk')
const AwsConfig = require('../config/aws');
const dynamo = require('../config/aws_dynamodb')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const credentials = require('../config/aws_credentials')
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const axios = require('axios');
 

function signUp(email, password,phone_number, agent = 'none') {
    return new Promise((resolve) => {
      AwsConfig.initAWS();
      AwsConfig.setCognitoAttributeList(email,phone_number,agent);
      AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), null, function(err, result){
        if (err) {
       
          return resolve({ statusCode: 422, response: err.message });
        }

        const response = {
          username: result.user.username,
          userConfirmed: result.userConfirmed,
          userAgent: result.user.client.userAgent,
          message:"Código enviado no email cadastrado. Verifique seu email!"
        }
        dynamo.initDynamo();
        dynamo.createUser(email, phone_number);
        return resolve({ statusCode: 201, response: response });
        });
       
      });
}
  
function verify(email, code) {  
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).confirmRegistration(code, true, (err, result) => {
      if (err) {
        return resolve({ statusCode: 422, response: err.message });
      }
      return resolve({ statusCode: 200, response: result });
    });
  });
}
  
function signIn(email, password) {
  return new Promise((resolve) => {
    
    AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
      onSuccess: (result) => {
        
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        }  
      
      
        return resolve({ statusCode: 200, response: AwsConfig.decodeJWTToken(token) });
    },
      
      onFailure: (err) => {
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
      },
    });
  });
}

function forgotPassword(email) {
  return new Promise((resolve) => {

      AwsConfig.initAWS();
      const user = AwsConfig.getCognitoUser(email)

      user.forgotPassword({
        onSuccess: function(result){
          return resolve({ statusCode: 200, response: "Código enviado ao email cadastrado. Verifique o email!" });
        },
        onFailure: function(err){
          return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
        }
      })
  })

}

function updatePassword(email, code, newPassword){
  return new Promise((resolve) => {
    AwsConfig.initAWS();
    const user = AwsConfig.getCognitoUser(email)
    user.confirmPassword(code, newPassword, {
      onSuccess: function(result){
        return resolve({ statusCode: 200, response: "Senha alterada com sucesso" });
      }, 
      onFailure: function(err){
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
      }
    })
  })
}

function listUser(user){
  return new Promise(async (resolve) =>{
    
    dynamo.initDynamo();
    const item = await dynamo.listUser(user)
    return resolve({ statusCode: 200, response: item });

  })

  
}

function updateUser(user, newPhoneNumber){
    return new Promise(async (resolve) => {
      
      dynamo.initDynamo()
      await dynamo.updateUser(user, newPhoneNumber); 

      return resolve({ statusCode: 200});

    })
}

function deleteUser (user){
  return new Promise(async(resolve) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const params = {
      UserPoolId: credentials.userPoolId,
      Username: user.username
    }; 
    try {
      await cognito.adminDeleteUser(params).promise(); 
      dynamo.initDynamo();
      try {
        const item = await dynamo.deleteUser(user)
        return resolve({ statusCode: 200});
      } catch (error) {
        console.log(errror)
      }
      

    } catch (error) {
      console.log(error)
    }
    
  })
}

function logout(user) {
  return new Promise(async (resolve) => {
  
    const poolData = {
      UserPoolId: credentials.userPoolId,
      ClientId: credentials.clientId
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

   
  
    // Obtendo os detalhes do usuário
    const userData = {
      Username: user.username,
      Pool: userPool
    };
  
    
    // Criando o objeto CognitoUser
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    // Verificando se o usuário está autenticado
    const session = await new Promise((innerResolve, innerReject) => {
      cognitoUser.getSession((err, session) => {
        if (err) {
          innerReject(err);
        } else {
          innerResolve(session);
        }
      });
    });
    
    if (!session || !session.isValid()) {
      console.log('User is not authenticated');
      // Handle the case where the user is not authenticated, e.g., redirect to login page
      return resolve({ success: false, message: 'User is not authenticated' });
    }

    // Limpar os tokens do armazenamento local
    localStorage.removeItem('CognitoIdentityServiceProvider.' + credentials.clientId + '.LastAuthUser');
    localStorage.removeItem('CognitoIdentityServiceProvider.' + credentials.clientId + '.' + user.username + '.idToken');
    localStorage.removeItem('CognitoIdentityServiceProvider.' + credentials.clientId + '.' + user.username + '.accessToken');
    localStorage.removeItem('CognitoIdentityServiceProvider.' + credentials.clientId + '.' + user.username + '.refreshToken');

    delete axios.defaults.headers.common['Authorization'];


    // Realizando o logout
    cognitoUser.globalSignOut({
      onSuccess: function (result) {
        console.log('Sign-out successful', result);
        return resolve({ success: true, message: 'Sign-out successful' });
      },
      onFailure: function (err) {
        console.log('Error during sign-out', err);
        return resolve({ success: false, message: 'Error during sign-out' });
      }
    });
  });
}


  
module.exports = {
    signUp,
    verify,
    signIn, 
    forgotPassword, 
    updatePassword,
    listUser,
    updateUser,
    deleteUser,
    logout
}