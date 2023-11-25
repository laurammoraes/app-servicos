const { Aws } = require('aws-cdk-lib');
const AwsConfig = require('../config/aws');
const dynamo = require('../config/aws_dynamodb')
 

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

  //Nessa função é necessário que realize a implementação de autorização de usuário pelo access token
  //A autorização esta em fase de implementação.
  // function logout(token){
  //   return new Promise((resolve) => {
  //     const email = AwsConfig.verify(token)
  //   })
  // }

  function listUser(){
    return new Promise(async (resolve) =>{
      //Nessa função é necessário que realize a implementação de autorização de usuário pelo access token
      //dessa forma não será necessário passar o email para realizar get. A autorização esta em fase de implementação.
      const email = "laurammoraes2@gmail.com"
      dynamo.initDynamo();
      const item = await dynamo.listUser(email)
      console.log(item)
      return resolve({ statusCode: 200, response: item });

    })

    
  }

  function updateUser(newPhoneNumber){
      return new Promise(async (resolve) => {
        //Nessa função é necessário que realize a implementação de autorização de usuário pelo access token
        //dessa forma não será necessário passar o email para realizar update. A autorização esta em fase de implementação.
        const email = "laurammoraes2@gmail.com"
        dynamo.initDynamo()
        const item = await dynamo.updateUser(email, newPhoneNumber); 
        return resolve({ statusCode: 200});

      })
  }
  function deleteUser (){
      return new Promise(async(resolve) => {
        //Nessa função é necessário que realize a implementação de autorização de usuário pelo access token
        //dessa forma não será necessário passar o email para realizar delete. A autorização esta em fase de implementação.
        const email = "laurammoraes2@gmail.com"
        AwsConfig.initAWS()
        const user = AwsConfig.getCognitoUser(email)
        user.deleteUser((err,data) =>{
          if(err){
            console.log("Erro: ", err);
          }else{
            console.log("Usuário deletado")

          }
        })
      })
  }
  
  module.exports = {
      signUp,
      verify,
      signIn, 
      forgotPassword, 
      updatePassword,
      listUser,
      updateUser,
      deleteUser
  }