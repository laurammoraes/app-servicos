const config = require('./src/config/aws_credentials');
const routersAuth = require('./src/routers/auth')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


async function startServer(){

  const app = express()
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/', routersAuth)
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app.listen(config.port, err => {
    if(err){
      console.log(err);
      return;
    }
  })

};

startServer();
