'use strict'

const db = require('./database');

exports.getActOfficers = () => {
    return new Promise((resolve, reject) => {
        let working='working';
        let waiting='waiting';
        const sql = 'SELECT * FROM officers WHERE status=? OR status=?';
        db.all(sql, [working, waiting], (err, rows) => {
            if(err) {
                reject(err);
                return;
            }
            const officers = rows.map((o) => ({officerId: o.officerId, name: o.name, status: o.status, counter: o.counterId}));
            resolve(officers);
        });
    });
};


exports.updateStatus = (officerId, stat) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE officers SET status=? WHERE officerId=?';
        db.run(sql, [stat, officerId], function(err) {
            if(err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};