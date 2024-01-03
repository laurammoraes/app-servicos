var aws = require('aws-sdk');
var dynamo = require('dynamodb');
const credentials = require('./credentialsAws');

function initDynamo(accessKeyId = credentials.accessKey, secretAccessKey = credentials.secretKey, region = credentials.region){
    try {
        var init = dynamo.AWS.config.update({accessKeyId, secretAccessKey, region});
        
        return init
    } catch (error) {
        throw error; 
    }
}

function createService(nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService){

    var table = credentials.tableName;
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Item:{
            
            "nameService": nameService,
            "descService": descService,
            "priceMinService": priceMinService,
            "productService": productService,
            "avgTimeService": avgTimeService,
            "idCreateService": idCreateService,
            "categoryService": categoryService


        }
    }
    
    doc.put(values, function(err, data) {
        if (err) {
            return err
        } else {
           return data
        }
    }); 
}



module.exports = {
    initDynamo,
    createService
  }
