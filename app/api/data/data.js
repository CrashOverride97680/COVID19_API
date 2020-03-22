// IMPORT MODULES NODEJS    
    const FileSync = require('lowdb/adapters/FileSync');
    const low = require('lowdb');    
    const adapter = new FileSync(__dirname + '/db.json');
    
    const db = low(adapter);
//  EXPORTING NODE MODULE
module.exports =  {
    reset: () => {
        db.defaults({ cases: [] }).write();
    },

    removeAll: () => {
        db
        .get('cases')
        .remove()
        .write();
    },

    insert: data => {
        db.get('cases')
        .push(data)
        .write();
    },

    size: () => {
        const data = db.get('cases').size().value();
        return data;
    },

    dbAllProvince: () => db.get('cases').value(),

};