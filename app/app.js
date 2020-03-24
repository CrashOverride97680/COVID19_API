// IMPORT MODULES NODEJS
    const express = require('express');
    const bodyParser = require('body-parser');
    const compression = require('compression');
    const path = require('path');
    const schedule = require('node-schedule');
    const fs = require('fs');
    const axios = require('axios');
    const dotenv = require('dotenv').config();
    const log4js = require('log4js');
    const cron = require('./api/sheduling/scheduler');
    const router = require('./api/router/router'); 
    log4js.configure({
        appenders: { 
            error: { 
                type: 'file', 
                filename: './log/error.log' 
            } 
        },
        categories: { 
            default: { 
                appenders: ['error'], 
                level: 'error'
            } 
        }
    });
    const logger = log4js.getLogger('error');
    const rateLimit = require("express-rate-limit");
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100 
    });
    const db = require('./api/data/data');
// IMPORTING LANG AND DEBUG
    const langServer = `./lang/${( process.env.LANG_SERVER || 'eng' )}`;
    const lang = require(langServer);
    if (process.env.NODE_ENV_DEV || process.env.NODE_DEV_ENV_VAR)
        console.log(lang.LABEL_LANGUAGE_SETTED, lang.LABEL_LANG);
//  RESET DB
    db.reset();
// FIRST LOAD
    //  PROVINCE LOAD
        axios
            .get(process.env.NODE_APIGIT_PROVICE)
            .then(resp => 
            {
                if ( process.env.NODE_ENV_DEV_API_CALL )
                    console.log(lang.LABEL_FIRST_LOAD_PROVINCE, resp); 
                db.removeAll('cases_province');
                resp
                .data
                .forEach(el => db.insert({
                    name: 'cases_province',
                    data: el
                }));
        
                if ( process.env.NODE_ENV_DEV )
                    console.log(lang.LABEL_FIRST_LOAD_DATA_INSERTED_PROVINCE, db.size('cases_province'));
            })
            .catch(err => console.log(lang.LABEL_FIRST_LOAD_PROVINCE_ERROR, err));
    
    //  REGION LOAD
        axios
            .get(process.env.NODE_APIGIT_REGION)
            .then(resp => 
            {
                if ( process.env.NODE_ENV_DEV_API_CALL )
                    console.log(lang.LABEL_FIRST_LOAD_REGION, resp); 
                db.removeAll('cases_region');
                resp
                .data
                .forEach(el => db.insert({
                    name: 'cases_region',
                    data: el
                }));

                if ( process.env.NODE_ENV_DEV )
                    console.log(lang.LABEL_FIRST_LOAD_DATA_INSERTED_REGION, db.size('cases_region'));
            })
            .catch(err => console.log(lang.LABEL_FIRST_LOAD_PROBLEM_PROVINCE, err));
    
    //  NATIONAL LOAD 
        axios
            .get(process.env.NODE_APIGIT_NATIONAL)
            .then(resp => 
            {
                if ( process.env.NODE_ENV_DEV_API_CALL )
                    console.log(lang.LABEL_FIRST_LOAD_NATIONAL, resp); 
                db.removeAll('cases_national');
                resp
                .data
                .forEach(el => db.insert({
                    name: 'cases_national',
                    data: el
                }));

                if ( process.env.NODE_ENV_DEV )
                    console.log(lang.LABEL_FIRST_LOAD_DATA_INSERTED_NATIONAL, db.size('cases_national'));
            })
            .catch(err => console.log(lang.LABEL_FIRST_LOAD_PROBLEM_PROVINCE, err));
// CRON DATA
    cron();
//  DEBUG VARIABLES ENVIROMENT
    if ( process.env.NODE_ENV_DEV || process.env.NODE_DEV_ENV_VAR )
        console.log(lang.LABEL_ENV_VAR, dotenv);
// INIZIALIZE FUNCTION, CLASS, ELEMENT AND MODULES
    const app = express();
// GENERAL FUNCTIONS
    const shouldCompress = (req, res) => 
    {
        if (req.headers['x-no-compression'])
            return false
        return compression.filter(req, res)
    };
// USE MIDDLEWARE
    app
    .use(compression({filter: shouldCompress}));
    app
    .use((req, res, next) =>  
    {
        res
        .header('Access-Control-Allow-Origin', "*");
        res
        .header('Access-Control-Allow-Headers', "*");
        res
        .header('Access-Control-Allow-Methods',  'POST, GET, PUT, DELETE');
        next();
    });
    app
    .use(bodyParser.urlencoded({ extended: true }));
    app
    .use(bodyParser.json());
    app
    .use(limiter);
//  ROUTER ENTRYPOINT
    app
    .use('/api', router);
    /*app
    .use(express.static(path.join(__dirname, 'public')));*/
// GENERAL VARIABLE AND SETTING CONF
    const port =  process.env.port || process.env.PORT || 9000;
    app.set('PORT', port);
// INIZIALIZE SERVER
    // app.listen(app.get('PORT'), 'localhost');
    app.listen(app.get('PORT'), () => console.log(lang.LABEL_SERVER, app.get('PORT')));
    // console.log(lang.LABEL_SERVER, app.get('PORT'));
// EXPORTING APP FOR TESTING
    module.exports = app;