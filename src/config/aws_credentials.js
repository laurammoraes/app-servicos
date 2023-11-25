const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();

if (envFound.error) {

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_ID,
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID, 
  region: process.env.AWS_COGNITO_REGION,
  identityPool: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  tableName: process.env.TABLE_NAME, 
  port: parseInt(process.env.PORT,10 ),
  
}