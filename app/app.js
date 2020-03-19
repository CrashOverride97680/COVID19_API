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
// IMPORTING LANG AND DEBUG
    const langServer = `./lang/${( process.env.LANG_SERVER || 'eng' )}`;
    const lang = require(langServer);
    if (process.env.NODE_ENV_DEV || process.env.NODE_DEV_ENV_VAR)
        console.log(lang.LABEL_LANGUAGE_SETTED, lang.LABEL_LANG);
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
// CRON WITH DATA COVID19

// USE MIDDLEWARE
    app.use(compression({filter: shouldCompress}));
    app.use((req, res, next) =>  
    {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', "*");
        res.header('Access-Control-Allow-Methods',  'POST, GET, PUT, DELETE');
        next();
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.use('/api', router);
    app.use(express.static(path.join(__dirname, 'public')));
// GENERAL VARIABLE AND SETTING CONF
    const port =  process.env.port || process.env.PORT || 9000;
    app.set('PORT', port);
// INIZIALIZE SERVER
    app.listen(app.get('PORT'), 'localhost');
    console.log(lang.LABEL_SERVER, app.get('PORT'));
// EXPORTING APP FOR TESTING
    module.exports = app;