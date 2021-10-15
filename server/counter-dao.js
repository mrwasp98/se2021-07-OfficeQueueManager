'use strict';

const db = require('./database');

exports.createCounter = (counterId, serviceId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO counter_service(counterId, serviceId) VALUES(?, ?)';
        db.run(sql, [counterId,serviceId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};