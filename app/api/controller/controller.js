// IMPORT MODULES NODEJS
    const db = require('../data/data');
module.exports = {
    controllerAllProvince: db.dbAllProvince,
    controllerAllRegion: db.dbAllRegion,
    controllerAllNational: db.dbAllNational,
    controllerFindDataByProvince: ( el, dataPassed ) => { 
        const data = db.find(el, dataPassed);
        return data;
    },
    controllerFindData: ( el, dataPassed ) => { 
        const data = db.find(el, dataPassed);
        return data;
    },
};