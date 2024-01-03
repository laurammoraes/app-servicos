const { config } = require('dotenv');
const AWS = require('aws-sdk')
const AwsConfig = require('../config/aws');
const dynamo = require('../config/dynamodb')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const credentials = require('../config/aws_credentials')
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const axios = require('axios');
 

function submitService(nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService) {
    return new Promise((resolve) => {
        try {
            dynamo.initDynamo();
            dynamo.createService(nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService);
            return resolve({ statusCode: 201, response: data});
        } catch (error) {
            return resolve({ statusCode: 201, response: error });
        }
          
        

      
      });
}
  

  
module.exports = {
    submitService,
}