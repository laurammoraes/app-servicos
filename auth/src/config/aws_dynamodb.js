var aws = require('aws-sdk');
var dynamo = require('dynamodb');
const credentials = require('./aws_credentials');

function initDynamo(accessKeyId = credentials.accessKey, secretAccessKey = credentials.secretKey, region = credentials.region){
    try {
        var init = dynamo.AWS.config.update({accessKeyId, secretAccessKey, region});
        
        return init
    } catch (error) {
        throw error; 
    }
}

function createUser(email, phone_number, type){

    var table = credentials.tableName;
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Item:{
            
            "email": email,
            "phone_number": phone_number,
            "type": type
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
   
    var table = "serviceasy";
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Key:{
            email: user.email
        }

    }

    const item = await doc.get(values, function(err, data){

        return JSON.stringify(data)

    }).promise();

    return item
}

async function deleteUser(user){
   
    var table = "serviceasy";
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Key:{
            email: user.email
        }

    }

    const item = await doc.delete(values, function(err, data){

        return "Usuário excluído com sucesso"

    }).promise();

    return item
}

 

async function updateUser(user, newPhoneNumber){
    var table = credentials.tableName;
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Key:{
            email: user.email
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
    updateUser, 
    deleteUser
  }
