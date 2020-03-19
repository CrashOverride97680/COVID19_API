const schedule = require('node-schedule');
const axios = require('axios');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./api/data/db.json'); 
const db = low(adapter);
const langServer = `../../lang/${( process.env.LANG_SERVER || 'eng' )}`;
const lang = require(langServer);
db
.defaults({ cases: [] })
.write();
module.exports = () => {
    axios
        .get('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json')
        .then(resp => 
        {
            if ( process.env.NODE_ENV_DEV_API_CALL )
                console.log(LABEL_FIRST_LOAD, resp);
            db.get('cases')
                .remove()
                .write();
        });

    schedule.scheduleJob('10 * * * * *', () => {
        axios
            .get('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json')
            .then(resp => 
            {
                if ( process.env.NODE_ENV_DEV_API_CALL )
                    console.log(LABEL_CRON_LOAD, resp);
            });
    });
};