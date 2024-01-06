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
        return resolve({ statusCode: 201, response: "Serviço cadastrado com sucesso"});
    })
}
  

  
module.exports = {
    submitService,
    updateService
}