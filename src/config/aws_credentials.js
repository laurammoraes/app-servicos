const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();


//Arquivo de criação e conexão com o serviço do cognito da AWS
//Credenciais para conexão:
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  user_pool_id: process.env.AWS_COGNITO_USER_POOL_ID,
  client_id: process.env.AWS_COGNITO_CLIENT_ID, 
  region: process.env.AWS_COGNITO_REGION,
  identity_pool: process.env.AWS_COGNITO_IDENTITY_POOL_ID
}