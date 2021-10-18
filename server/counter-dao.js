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
            resolve(counterId);
        });
    });
};

exports.getNewCounterID = function () {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT MAX(counterId) AS result FROM counter_service';
      db.get(sql, [], (err, row) => {
        if (err)
          reject(err);
        if(!row.result) resolve(1)
        else resolve(row.result+1)      
      });
    });
  }