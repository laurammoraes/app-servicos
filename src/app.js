const config = require('./config');
const loaders = require('./loaders/auth')
const express = require('express')


async function startServer(){



const app = express()
//Para enviar na requisição um body, são necessárias as duas instâncias seguintes:

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', loaders)


app.listen(config.port, err => {
  if(err){
    console.log(err);
    return;
  }
  console.log(`Example app listening on port ${config.port}`)
})

};

startServer();
