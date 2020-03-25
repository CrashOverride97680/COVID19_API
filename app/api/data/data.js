// IMPORT MODULES NODEJS    
    const FileSync = require('lowdb/adapters/FileSync');
    const low = require('lowdb');    
    const adapter = new FileSync(__dirname + '/db.json');

    const db = low(adapter);
//  EXPORTING NODE MODULE
module.exports =  {
    
    reset: () => {
        db.defaults({ cases_province: [], cases_region:[], cases_national: [] }).write();
    },

    removeAll: name => {
        db
        .get(name)
        .remove()
        .write();
    },

    insert: ( { name, data  } ) => {
        db.get(name)
        .push(data)
        .write();
    },

    size: name => {
        const data = db.get(name).size().value();
        return data;
    },

    dbAllProvince: () => db.get('cases_province').value(),

    dbAllRegion: () => db.get('cases_region').value(),

    dbAllNational: () => db.get('cases_national').value(),

    find: ( el, data ) => { 
        const dataFind = db.get(el).filter(data).value();
        return dataFind;
    },

};