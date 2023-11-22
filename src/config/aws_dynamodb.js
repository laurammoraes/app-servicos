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

        const table = "serviceasy"

        var values = {
            TableName: table, 
            Item:{
               
                "email": email,
                "phone_number": phone_number
            }
        }
        var doc = new aws.DynamoDB.DocumentClient();
        doc.put(values, function(err, data) {
            if (err) {
                console.error("Erro: ", JSON.stringify(err, null, 2));
            } else {
                console.log("Item adicionado! ", JSON.stringify(data, null, 2));
            }
        });

        
    
   
    

}

module.exports = {
    initDynamo,
    createUser
  }
