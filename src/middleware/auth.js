const credentials = require('../config/aws_credentials')


var dataAWS = {
    region: credentials.region,
    userPoolId: credentials.userPoolId
}

function verifyToken(req, res){
    console.log("teste")

}

module.exports = {
    verifyToken,
}