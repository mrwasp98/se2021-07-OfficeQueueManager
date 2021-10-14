'use strict';

const db = require('./database');

exports.createService = (service) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO services(tag_name,service_time) VALUES(?, ?)';
        db.run(sql, [service.tagName,service.serviceTime], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};