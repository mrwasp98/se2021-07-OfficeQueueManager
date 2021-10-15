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

exports.getId = (tagname) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM services WHERE tag_name=?';
        db.get(sql, [tagname], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Service not found.' });
            }
            else {
                resolve(row.id);
            }
        });
    });
};

exports.getNames = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT tag_name FROM services';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};