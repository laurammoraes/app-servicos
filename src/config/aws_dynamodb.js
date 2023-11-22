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

    //Trativa para não cadastrar dois usuários iguais no banco de dados.

        var table = "serviceasy";
        var doc = new aws.DynamoDB.DocumentClient();

        var valuesGet = {
            TableName: table,
        };
        let items;
        items = doc.scan(valuesGet, function(err, data) {
            if (err) {
                console.error("Erro: ", JSON.stringify(err, null, 2));
            } else {
                console.log("Item encontrado! ", JSON.stringify(data, null, 2));
            }
        }).promise();
        console.log(items)

      


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
                console.log("Item adicionado! ");
            }
        });

        
    
   
    

}

module.exports = {
    initDynamo,
    createUser
  }
