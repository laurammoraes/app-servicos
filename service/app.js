const config = require('./src/config/credentialsAws');
const routersServices = require('./src/routers/service')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


async function startServer(){

  const app = express()
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/service', routersServices)
  app.use('/service/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app.listen(config.port, err => {
    if(err){
      console.log(err);
      return;
    }
  })

};

startServer();
