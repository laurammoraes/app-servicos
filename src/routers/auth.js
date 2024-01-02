'use strict';
require('dotenv').config();
const express = require('express');
const authService = require('../services/auth');
const router = express.Router();
const auth = require('../middleware/auth')


router.post('/user', async (req, res) => {

     /* #swagger.tags = ['User']
           #swagger.description = 'Endpoint for user register.' */

     /* #swagger.parameters['Register'] = {
	       in: 'body',
               description: 'Data for register',
               type: 'string',
               schema: { $ref: "#/definitions/DataUser" }
        } */

    var email = req.body.email 
    var password = req.body.password
    var phone_number = req.body.phone_number
    var type = req.body.type
    const response = await authService.signUp(email,password,phone_number,type);
    res.json(response)
});
router.get('/user', auth.verifyToken, async(req, res) =>{
   
     /* #swagger.tags = ['User']
        #swagger.description = 'Endpoint for view data of user.' */
  
    const user = req.userId  
    const response = await authService.listUser(user);
    res.json(response)
});
router.put('/user',auth.verifyToken, async(req, res) => {

    /* #swagger.tags = ['User']
           #swagger.description = 'Endpoint for update data for user.' */

     /* #swagger.parameters['Update'] = {
	       in: 'body',
               description: 'Data for update register',
               type: 'string',
               schema: { $ref: "#/definitions/UpdateUser" }
        } */
    const user = req.userId 
    const newPhoneNumber = req.body.phone_number;
    const response = await authService.updateUser(user, newPhoneNumber);
    res.json(response)
});
router.delete('/user', auth.verifyToken, async(req,res)=> {

     /* #swagger.tags = ['User']
        #swagger.description = 'Endpoint for delete user.' */
    const user = req.userId 
    
    const response = await authService.deleteUser(user); 
    res.json(response )
});
router.post('/login', async (req, res) => {

    /* #swagger.tags = ['Auth']
           #swagger.description = 'Login' */

     /* #swagger.parameters['Login'] = {
	       in: 'body',
               description: 'Provide email and password registred',
               type: 'string',
               schema: { $ref: "#/definitions/LoginUser" }
        } */

    var email = req.body.email 
    var password = req.body.password
    const response = await authService.signIn(email,password);
    res.json(response)
}
);
router.post('/verifyCode', async (req, res) => {

    /* #swagger.tags = ['Auth']
           #swagger.description = 'Checking verification code' */

     /* #swagger.parameters['Checking'] = {
	       in: 'body',
               description: 'Provide email and verification code',
               type: 'string',
               schema: { $ref: "#/definitions/VerifyUser" }
        } */
    var email = req.body.email 
    var codeEmailVerify = req.body.codeEmailVerify
    const response = await authService.verify(email,codeEmailVerify);
    res.json(response)
});
router.post('/forgotPassword', async (req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Request verification code for update password' */

    /* #swagger.parameters['Verification'] = {
        in: 'body',
            description: 'Provide email registered',
            type: 'string',
            schema: { $ref: "#/definitions/ForgotPassword" }
    } */

    const email = req.body.email; 
    const response = await authService.forgotPassword(email); 
    res.json(response)
});
router.post('/updatePassword', async (req, res) => {

    /* #swagger.tags = ['Auth']
        #swagger.description = 'Update password' */

    /* #swagger.parameters['Update'] = {
        in: 'body',
            description: 'Provide email and new password',
            type: 'string',
            schema: { $ref: "#/definitions/UpdatePassword" }
    } */

    const email = req.body.email; 
    const code = req.body.code; 
    const newPassword = req.body.newPassword; 
    const response = await authService.updatePassword(email, code, newPassword);
    res.json(response)
})
router.get('/logout', auth.verifyToken, async(req, res) => {
    
    const user = req.userId
    const response = await authService.logout(user)
    res.json(response)
})

module.exports = router;

