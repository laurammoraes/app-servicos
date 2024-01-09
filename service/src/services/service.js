const { config } = require('dotenv');
const AWS = require('aws-sdk')
const AwsConfig = require('../config/credentialsAws');
const dynamo = require('../config/dynamodb')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const credentials = require('../config/credentialsAws')
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const axios = require('axios');
 

function submitService(key, nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService) {
    return new Promise((resolve) => {
   
        dynamo.initDynamo();
        dynamo.createService(key, nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService);
        return resolve({ statusCode: 201, response: "Serviço cadastrado com sucesso"});
      
      });
};

function updateService(key, nameService, newdescService, newpriceMinService,newproductService,newavgTimeService,idCreateService,newcategoryService){
    return new Promise((resolve) => {
        dynamo.initDynamo();
        dynamo.verifyUpdateService(key, nameService, newdescService, newpriceMinService,newproductService,newavgTimeService,idCreateService,newcategoryService)
        return resolve({ statusCode: 201, response: "Serviço atualizado com sucesso"});
    })
}

function deleteService(key){
    return new Promise((resolve) => {
        dynamo.initDynamo();
        dynamo.deleteService(key)
        return resolve({ statusCode: 201, response: "Item deletado"});
    })
}

function getService(key){
    return new Promise(async (resolve) => {
        dynamo.initDynamo();
        const item = await dynamo.getService(key)
        return resolve({ statusCode: 201, response: item});
    })
}
  
  
  

  
module.exports = {
    submitService,
    updateService,
    deleteService,
    getService
}