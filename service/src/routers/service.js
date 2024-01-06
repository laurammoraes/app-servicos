'use strict';
require('dotenv').config();
const express = require('express');
const service= require('../services/service');
const router = express.Router();
const auth = require('../../../auth/src/middleware/auth')


router.post('/',auth.verifyToken, async (req, res) => {

     /* #swagger.tags = ['Service']
           #swagger.description = 'Endpoint for submit service.' */

     /* #swagger.parameters['Register'] = {
	       in: 'body',
               description: 'Data for register',
               type: 'string',
               schema: { $ref: "#/definitions/DataService" }
        } */

    var nameService = req.body.nameService;
    var descService = req.body.descService;
    var priceMinService = req.body.priceMinService;
    var productService = req.body.productService;
    var avgTimeService = req.body.avgTimeService;
    var idCreateService = req.userId.email;
    var categoryService = req.body.categoryService;
    var key = nameService + idCreateService;
    
    const response = await service.submitService(key, nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService);
    res.json(response)
});

router.put('/', async (req, res) => {

    /* #swagger.tags = ['Service']
          #swagger.description = 'Endpoint for update service.' */

    /* #swagger.parameters['Register'] = {
          in: 'body',
              description: 'Data for register',
              type: 'string',
              schema: { $ref: "#/definitions/DataService" }
       } */

   var nameService = req.body.nameService;
   var descService = req.body.descService;
   var priceMinService = req.body.priceMinService;
   var productService = req.body.productService;
   var avgTimeService = req.body.avgTimeService;
   var idCreateService = req.userId;
   var categoryService = req.body.categoryService;
   var key = nameService + idCreateService;
   
   const response = await service.submitService(key, nameService, descService, priceMinService,productService,avgTimeService,idCreateService,categoryService);
   res.json(response)
});




module.exports = router;

