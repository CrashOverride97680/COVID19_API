// IMPORT MODULES NODEJS AND INIZIALIZE
    const express = require('express');
    const router = express.Router();
    const controller = require('../controller/controller');
//  ENTRYPOINT GET
    router
    .get('/v1/province/all', (req, resp) => 
    { 
        const data = controller.controllerAllProvince();
        resp.json(data);
    });

    router
    .get('/v1/region/all', (req, resp) => 
    { 
        const data = controller.controllerAllRegion();
        resp.json(data);
    });

    router
    .get('/v1/national/all', (req, resp) => 
    { 
        const data = controller.controllerAllNational();
        resp.json(data);
    });
//  ENTRYPOINT POST
//  ENTRYPOINT PUT
//  ENTRYPOINT DELETE
//  ENTRYPOINT DEBUG
    if ( process.env.NODE_ENV_DEV )
        router
        .get('/serverStatus', (req, resp) => resp.json({result: 'Server Running!'}));
//  EXPORTING MODULE
    module.exports = router;