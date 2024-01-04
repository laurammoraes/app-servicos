const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();

if (envFound.error) {

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_COGNITO_REGION,
  secretKey: process.env.AWS_SECRET_ACCESS_ID,
  tableName: process.env.TABLE_NAME_SERVICE, 
  port: parseInt(process.env.PORT,10 ),
  
}