'use strict';

require('dotenv').config();

const express = require('express');

const authService = require('../services/auth');

const router = express.Router();

router.get('/singup', async (req, res) => {
    
    const response = await authService.signUp(req.body.email,req.body.password);

    res.json(response)
}
);
router.post('/singup/', (req, res) => {
    
    // const response = await authService.signUp(req.body.email,req.body.password);

    // res.json(response)
}
);

router.get('/singin', async (req, res) => {
    const response = await authService.signIn(req.body.email,req.body.password);
    res.json(response)
}
);
router.get('/verify', async (req, res) => {
    const response = await authService.verify(req.body.email,req.body.codeEmailVerify);
    res.json(response)
});

module.exports = router;

