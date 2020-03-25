// IMPORT MODULES NODEJS AND INIZIALIZE
    const express = require('express');
    const router = express.Router();
    const controller = require('../controller/controller');
//  ENTRYPOINT GET
    // READ ALL DATA
        router
        .get('/v1/province/all', (req, resp) => { 
            const data = controller.controllerAllProvince();
            resp.json(data);
        })
        .get('/v1/region/all', (req, resp) => { 
            const data = controller.controllerAllRegion();
            resp.json(data);
        })
        .get('/v1/national/all', (req, resp) => { 
            const data = controller.controllerAllNational();
            resp.json(data);
        })
    // READ BY PARAMS
        .get('/v1/province/name/:name', (req, resp) => { 
            const data = controller.controllerFindDataByProvince('cases_province', {
                denominazione_provincia: (req.params.name).replace(/\b\w/g, l => l.toUpperCase()), 
            });
            resp.json(data);
        })
        .get('/v1/province/regionName/:name', (req, resp) => { 
            const data = controller.controllerFindData('cases_province', {
                denominazione_regione: (req.params.name).replace(/\b\w/g, l => l.toUpperCase()), 
            });
            resp.json(data);
        })
        .get('/v1/region/denRegion/:name', (req, resp) => { 
            const data = controller.controllerFindData('cases_region', {
                denominazione_regione: (req.params.name).replace(/\b\w/g, l => l.toUpperCase()), 
            });
            resp.json(data);
        })
    // API TEST
        .get('/serverStatus', (req, resp) => resp.json({res: 'Request get ok', testing:true, server: 'Work'}));
//  ENTRYPOINT POST
//  ENTRYPOINT PUT
//  ENTRYPOINT DELETE
//  ENTRYPOINT DEBUG
    if ( process.env.NODE_ENV_DEV )
        router
        .get('/serverStatus', (req, resp) => resp.json({result: 'Server Running!'}));
//  EXPORTING MODULE
    module.exports = router;