'use strict';

require('dotenv').config();

const express = require('express');

const authService = require('../services/auth');

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
    
    const response = await authService.signUp(req.body.email,req.body.password, req.body.phone_number);

    res.json(response)
}
);

router.post('/singin', async (req, res) => {

    /* #swagger.tags = ['User']
           #swagger.description = 'Endpoint de login do usuário' */

     /* #swagger.parameters['Login'] = {
	       in: 'body',
               description: 'Forneça o email cadastrado e a senha',
               type: 'string',
               schema: { $ref: "#/definitions/LoginUser" }
        } */
    
    const response = await authService.signIn(req.body.email,req.body.password);
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
    
    const response = await authService.verify(req.body.email,req.body.codeEmailVerify);
    res.json(response)
});

module.exports = router;

