var aws = require('aws-sdk');
var dynamo = require('dynamodb');
const credentials = require('./aws_credentials');

function initDynamo(accessKeyId = credentials.access_key, secretAccessKey = credentials.secret_key, region = credentials.region){
    try {
        var init = dynamo.AWS.config.update({accessKeyId, secretAccessKey, region});

        return init
    } catch (error) {
        throw error; 
    }
 

}

function createUser(email, phone_number){

        var table = "serviceasy";
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

async function listUser(email){
    var table = "serviceasy";
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Key:{
            email: email
        }
        
    }
 
    const item = await doc.get(values, function(err, data){
            
        return JSON.stringify(data)
        
    }).promise();
    
    return item
   
   
   
}

module.exports = {
    initDynamo,
    createUser,
    listUser
  }
