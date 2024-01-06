var aws = require('aws-sdk');
var dynamo = require('dynamodb');
const credentials = require('./credentialsAws');

function initDynamo(accessKeyId = credentials.accessKey, secretAccessKey = credentials.secretKey, region = credentials.region){
    try {
        var init = dynamo.AWS.config.update({accessKeyId, secretAccessKey, region});
        
        return init
    } catch (error) {
        console.log(error)
        throw error; 
    }
};

function createService(key,nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService){
    try {
        var table = credentials.tableName;
        var doc = new aws.DynamoDB.DocumentClient();
        var values = {
            TableName: table, 
            Item:{
                "key": key,
                "nameService": nameService,
                "descService": descService,
                "priceMinService": priceMinService,
                "productService": productService,
                "avgTimeService": avgTimeService,
                "idCreateService":  idCreateService,
                "categoryService": categoryService
            }
        }
      
        doc.put(values, function(err, data) {
            if (err) {
                console.log(err)
                return err
            } else {
            return data
            }
        }); 
            
        } catch (error) {
            console.log(error)
        }
    
};

function verifyUpdateService(key, nameService, newdescService, newpriceMinService,newproductService,newavgTimeService,idCreateService,newcategoryService){
    try {
        var table = credentials.tableName;
        var doc = new aws.DynamoDB.DocumentClient();
        var values = {
            TableName: table, 
            Key:{
                key: key
            }
            
        }
        doc.get(values, function(err, data) {
            if (err) {
                return err
            } else {
                if(typeof data.Item != 'undefined' && data.Item.key == key){
                    updateService( key, nameService, newdescService, newpriceMinService,newproductService,newavgTimeService,idCreateService,newcategoryService)
                }else{
                    console.log( "Não tem registro desse serviço")
                    return 
                }
            }
        }); 
            
        } catch (error) {
            console.log(error)
        }
};

async function updateService(key, nameService, newdescService, newpriceMinService,newproductService,newavgTimeService,idCreateService,newcategoryService){
    var table = credentials.tableName;
    var doc = new aws.DynamoDB.DocumentClient();
    var values = {
        TableName: table, 
        Key:{
            key: key
        },
        UpdateExpression:'set descService = :newdescService, priceMinService = :newpriceMinService, productService = :newproductService, avgTimeService = :newavgTimeService, categoryService = :newcategoryService',
        ExpressionAttributeValues: {
            ':newdescService': newdescService,  
            ':newpriceMinService': newpriceMinService,  
            ':newproductService': newproductService,  
            ':newavgTimeService': newavgTimeService, 
            ':newcategoryService': newcategoryService, 
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
    createService,
    updateService, 
    verifyUpdateService,
  }
