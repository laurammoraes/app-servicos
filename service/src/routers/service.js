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

router.put('/', auth.verifyToken, async (req, res) => {

    /* #swagger.tags = ['Service']
          #swagger.description = 'Endpoint for update service.' */

    /* #swagger.parameters['Register'] = {
          in: 'body',
              description: 'Data for register',
              type: 'string',
              schema: { $ref: "#/definitions/DataUpdateService" }
       } */

   var nameService = req.body.nameService;
   var newdescService = req.body.newdescService;
   var newpriceMinService = req.body.newpriceMinService;
   var newproductService = req.body.newproductService;
   var newavgTimeService = req.body.newavgTimeService;
   var idCreateService = req.userId.email;
   var newcategoryService = req.body.newcategoryService;
   var key = nameService + idCreateService;
   
   const response = await service.updateService(key, nameService, newdescService, newpriceMinService,newproductService,newavgTimeService,idCreateService,newcategoryService);
   res.json(response)
});

router.delete('/', auth.verifyToken, async(req, res) => {
     /* #swagger.tags = ['Service']
          #swagger.description = 'Endpoint for delete service.' */

    /* #swagger.parameters['Delete'] = {
          in: 'body',
              description: 'Data for delete',
              type: 'string',
              schema: { $ref: "#/definitions/DataDeleteService" }
       } */

    var nameService = req.body.nameService;
    var idCreateService = req.userId.email;
    var key = nameService + idCreateService;
    
    const response = await service.deleteService(key);
    res.json(response)
    
})

router.post('/list', auth.verifyToken, async(req, res) => {
    /* #swagger.tags = ['Service']
         #swagger.description = 'Endpoint for list especific service.' */

   /* #swagger.parameters['Get'] = {
         in: 'body',
             description: 'Data for list service',
             type: 'string',
             schema: { $ref: "#/definitions/DataListService" }
      } */

   var nameService = req.body.nameService;
   var idCreateService = req.userId.email;
   var key = nameService + idCreateService;
   
   const response = await service.getService(key);
   res.json(response)
   
})


module.exports = router;

