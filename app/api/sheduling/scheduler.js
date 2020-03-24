const schedule = require('node-schedule');
const axios = require('axios');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./api/data/db.json');
const db = low(adapter);
const langServer = `../../lang/${( process.env.LANG_SERVER || 'eng' )}`;
const lang = require(langServer);

module.exports = () => {

    schedule.scheduleJob('* * 1 * * *', () => {
        
        //  PROVINCE LOAD CRON
            axios
                .get(process.env.NODE_APIGIT_PROVICE)
                .then(resp => 
                {
                    if ( process.env.NODE_ENV_DEV_API_CALL )
                        console.log(lang.LABEL_CRON_LOAD_PROVINCE, resp); 
                    db.removeAll('cases_province');
                    resp
                    .data
                    .forEach(el => db.insert({
                        name: 'cases_province',
                        data: el
                    }));
            
                    if ( process.env.NODE_ENV_DEV )
                        console.log(lang.LABEL_CRON_LOAD_DATA_INSERTED_PROVINCE, db.size('cases_province'));
                })
                .catch(err => console.log(lang.LABEL_CRON_ERROR_PROBLEM_PROVINCE, err));
        
    //  REGION LOAD CRON
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
                    console.log(lang.LABEL_CRON_LOAD_DATA_INSERTED_REGION, db.size('cases_region'));
            })
            .catch(err => console.log(lang.LABEL_CRON_ERROR_PROBLEM_REGION, err));
    
    //  NATIONAL LOAD CRON 
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
                    console.log(lang.LABEL_CRON_LOAD_DATA_INSERTED_NATIONAL, db.size('cases_national'));
            })
            .catch(err => console.log(lang.LABEL_CRON_ERROR_PROBLEM_NATIONAL, err));
    });

};