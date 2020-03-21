// IMPORT MODULES NODEJS AND INIZIALIZE
    const express = require('express');
    const router = express.Router();
//  ENTRYPOINT GET
    router
    .get('/', (req, resp) => 
    {
        resp.json({
            example: 'TEST',
            result: 'WORK!!!!'
        });
    });
//  ENTRYPOINT POST
//  ENTRYPOINT PUT
//  ENTRYPOINT DELETE
//  EXPORTING MODULE
    module.exports = router;