// IMPORT MODULES NODEJS
    const db = require('../data/data');
module.exports = {
    controllerAllProvince: db.dbAllProvince,
    controllerAllRegion: db.dbAllRegion,
    controllerAllNational: db.dbAllNational,
};