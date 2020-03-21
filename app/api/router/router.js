// IMPORT MODULES NODEJS AND INIZIALIZE
    const express = require('express');
    const router = express.Router();
//  ENTRYPOINT GET
//  ENTRYPOINT GET
    router
    .get('/province', (req, resp) => 
    { 
        resp.json({result: 'Server Running!'})
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