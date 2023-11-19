const config = require('./src/config');
const loaders = require('./src/loaders/auth')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


async function startServer(){



const app = express()
//Para enviar na requisição um body, são necessárias as duas instâncias seguintes:

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', loaders)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

console.log(config.port)
app.listen(config.port, err => {
  if(err){
    console.log(err);
    return;
  }
  console.log(`Example app listening on port ${config.port}`)
})

};

startServer();
