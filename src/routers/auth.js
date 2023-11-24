'use strict';

require('dotenv').config();

const express = require('express');

const authService = require('../services/auth');
const { access_key } = require('../config/aws_credentials');

const router = express.Router();

router.post('/singup', async (req, res) => {

     /* #swagger.tags = ['User']
           #swagger.description = 'Endpoint para adicionar um usuário.' */

     /* #swagger.parameters['Cadastro'] = {
	       in: 'body',
               description: 'Forneça seus dados para cadastro',
               type: 'string',
               schema: { $ref: "#/definitions/AddUser" }
        } */

    var email = req.body.email 
    var password = req.body.password
    var phone_number = req.body.phone_number
    const response = await authService.signUp(email,password,phone_number );

    res.json(response)
}
);

router.get('/list-user', async(req, res) =>{
    const response = await authService.listUser();
    res.json(response)
});

router.put('/update-user', async(req, res) => {
    const newPhoneNumber = req.body.phone_number;
    const response = await authService.updateUser(newPhoneNumber);
    res.json(response)
})


router.post('/singin', async (req, res) => {

    /* #swagger.tags = ['User']
           #swagger.description = 'Endpoint de login do usuário' */

     /* #swagger.parameters['Login'] = {
	       in: 'body',
               description: 'Forneça o email cadastrado e a senha',
               type: 'string',
               schema: { $ref: "#/definitions/LoginUser" }
        } */
    var email = req.body.email 
    var password = req.body.password
    
    const response = await authService.signIn(email,password);
    res.json(response)
}
);
router.post('/verify', async (req, res) => {

    /* #swagger.tags = ['User']
           #swagger.description = 'Endpoint para verificar o email do usuário e ativar o cadastro no Cognito.' */

     /* #swagger.parameters['Verificação'] = {
	       in: 'body',
               description: 'Forneça o email cadastrado e o código de verificação',
               type: 'string',
               schema: { $ref: "#/definitions/VerifyUser" }
        } */
    var email = req.body.email 
    var codeEmailVerify = req.body.codeEmailVerify
    const response = await authService.verify(email,codeEmailVerify);
    res.json(response)
});

router.post('/forgot-password', async (req, res) => {
    /* #swagger.tags = ['User']
        #swagger.description = 'Endpoint para solicitar o código para recuperação da senha' */

    /* #swagger.parameters['Verificação'] = {
        in: 'body',
            description: 'Forneça o email cadastrado',
            type: 'string',
            schema: { $ref: "#/definitions/ForgotPassword" }
    } */

    const email = req.body.email; 

    const response = await authService.forgotPassword(email); 
    res.json(response)
})

router.post('/update-password', async (req, res) => {

    /* #swagger.tags = ['User']
        #swagger.description = 'Endpoint para vericação do código enviado no email e cadastro da nova senha' */

    /* #swagger.parameters['Verificação'] = {
        in: 'body',
            description: 'Forneça o email cadastrado, código de verificação e a nova senha',
            type: 'string',
            schema: { $ref: "#/definitions/UpdatePassword" }
    } */

    const email = req.body.email; 
    const code = req.body.code; 
    const newPassword = req.body.newPassword; 

    const response = await authService.updatePassword(email, code, newPassword);
    res.json(response)
})

// router.get('/logout', async (req, res)=>{
  
//     const token = req.headers.idToken
//     const response = await authService.logout(token)
// })



module.exports = router;

