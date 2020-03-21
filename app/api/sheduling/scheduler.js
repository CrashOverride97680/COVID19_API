const schedule = require('node-schedule');
const axios = require('axios');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./api/data/db.json');
const db = low(adapter);
const langServer = `../../lang/${( process.env.LANG_SERVER || 'eng' )}`;
const lang = require(langServer);

module.exports = () => {

    schedule.scheduleJob('* * 5 * * *', () => {
        axios
            .get(process.env.NODE_APIGIT_PROVICE)
            .then(resp => 
            {
                if ( process.env.NODE_ENV_DEV_API_CALL )
                    console.log(lang.LABEL_CRON_LOAD, resp);
                
                db
                .get('cases')
                .remove()
                .write();
                
                resp
                .data
                .forEach(el => db.get('cases')
                                    .push(el)
                                    .write());
                
                if ( process.env.NODE_ENV_DEV )
                    console.log(lang.LABEL_CRON_EXEC_LOAD_DATA, db.get('cases').size().value(), lang.LABEL_ROW);
            })
            .cath(err => console.log(lang.LABEL_CATH_CRON, err));
    });

};