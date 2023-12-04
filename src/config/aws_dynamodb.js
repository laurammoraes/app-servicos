var aws = require('aws-sdk');
var dynamo = require('dynamodb');
const credentials = require('./aws_credentials');

function initDynamo(accessKeyId = credentials.accessKey, secretAccessKey = credentials.secretKey, region = credentials.region){
    try {
        var init = dynamo.AWS.config.update({accessKeyId, secretAccessKey, region});
        console.log(init)
        return init
    } catch (error) {
        throw error; 
    }
}

function createUser(email, phone_number){

    var table = credentials.tableName;
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Item:{
            
            "email": email,
            "phone_number": phone_number
        }
    }
    
    doc.put(values, function(err, data) {
        if (err) {
            console.error("Erro: ", JSON.stringify(err, null, 2));
        } else {
            console.log('Item cadastrado!')
        }
    }); 
}

async function listUser(user){
   
    const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();

    const params = {
        UserPoolId: credentials.userPoolId,
        Username: user,
    };

    try {
        const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar usuário');
    }
}

   
// }

async function updateUser(email, newPhoneNumber){
    var table = credentials.tableName;
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Key:{
            email: email
        },
        UpdateExpression:'set phone_number = :newPhoneNumber',
        ExpressionAttributeValues: {
            ':newPhoneNumber': newPhoneNumber,  
        },
       
        
    }
    await doc.update(values, function(err, data){
        if (err) {
            console.error("Erro: ", JSON.stringify(err, null, 2));
        } else {
            console.log('Item alterado!')
        }
    }).promise();
}

module.exports = {
    initDynamo,
    createUser,
    listUser, 
    updateUser
  }
