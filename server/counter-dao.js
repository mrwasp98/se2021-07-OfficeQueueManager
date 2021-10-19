'use strict';

const db = require('./database');

const createCounter = async (counterId, serviceId) => {
  const sql = 'INSERT INTO counter_service(counterId, serviceId) VALUES(?, ?)';
  await new Promise((resolve, reject) => {
    db.run(sql, [counterId, serviceId], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID);
    });
  });
  return (0);
};


const getServicesID = async (servicesNames) => {
  let result = [];
  let sql = 'SELECT id FROM services WHERE tag_name=?'
  for (const serviceName of servicesNames) {
    console.log("nome: ", serviceName);
    let id = await new Promise((resolve, reject) => {
      db.get(sql, [serviceName], function (err, row) {
        if (err) return reject(err);
        console.log("id del servizio:", row.id)
        resolve(row.id);
      })
    })
    result.push(id);
  }
  return (result);
}

exports.getNewCounterID = function () {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT MAX(counterId) AS result FROM counter_service';
    db.get(sql, [], (err, row) => {
      if (err)
        reject(err);
      if (!row.result) resolve(1)
      else resolve(row.result + 1)
    });
  });
}

exports.getServicesID = getServicesID;
exports.createCounter = createCounter;