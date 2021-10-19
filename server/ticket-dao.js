'use strict';
const sqlite = require("sqlite3");
const db = new sqlite.Database('database.db', (err) => { if (err) throw err; });
const dayjs = require('dayjs');

//Generate a new surveyID idSurvey
exports.getNewID = function (id_service) {
  let now = dayjs();
  return new Promise((resolve, reject) => {
    let sql = 'SELECT MAX(ticket_num) AS result FROM tickets_to_serve WHERE date = ?';
    db.get(sql, [now.format('YYYY-MM-DD')], (err, row) => {
      if (err)
        reject(err);
      console.log(row)
      if (!row.result) resolve(1)
      else resolve(row.result + 1)
    });
  });
}

function TicketToServe(id_service, ticket_num) {
  this.id_service = id_service;
  this.ticket_num = ticket_num;
  this.date = dayjs().format('YYYY-MM-DD');
}

//Generate new Ticke_to_serve object
const createTicketToServe = function (row) {
  return new TicketToServe(row.id_service, row.ticket_num);
}

//Post a new ticket entry into database
exports.createTicketToServe = function (id_service, ticket_num) {
  const ticket = createTicketToServe({ id_service: id_service, ticket_num: ticket_num });
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO tickets_to_serve(id_service,date,ticket_num) VALUES(?,?,?)';
    db.all(sql, [ticket.id_service, ticket.date, ticket.ticket_num], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      else
        resolve(ticket_num);
    });
  });
}

function TicketServed(ticket_num, id_service, date, start_time, end_time, id_officer) {
  this.id_service = id_service;
  this.ticket_num = ticket_num;
  this.date = date;
  this.start_time = start_time;
  this.end_time = end_time;
  this.id_officer = id_officer;
}
//Generate new Ticke_served object
const createTicketServed = function (row) {
  return new TicketServed(row.ticket_num, row.id_service, row.date, row.start_time, row.end_time, row.id_officer);
}
//Post a new ticket entry into database
exports.createTicketServed = function (ticket_num, id_service, date, start_time, end_time, id_officer) {
  const ticket = createTicketServed({ id_service: id_service, ticket_num: ticket_num, id_officer: id_officer, date: date, start_time: start_time, end_time: end_time });
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO tickets_served(id_service,date,ticket_num,start_time,end_time,id_officer) VALUES(?,?,?,?,?,?)';
    db.all(sql, [ticket.id_service, ticket.date, ticket.ticket_num, ticket.start_time, ticket.end_time, ticket.id_officer], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      else
        resolve(ticket_num);
    });
  });
}

exports.getEstimateTime = () => {
  return new Promise((resolve, reject) => {
    const sql = 'select sum(service_time) as EstimateTime, count() as InLinePerson from tickets_to_serve ts, services s where s.id=ts.id_service and ts.date = ?';
    db.get(sql, [dayjs(new Date()).format('YYYY-MM-DD')], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const estimate = { EstimateTime: rows.EstimateTime, InLinePerson: rows.InLinePerson };
      resolve(estimate);
    });
  });
};

exports.getServedCustomer = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT f.counterId,ts.ticket_num FROM tickets_served ts,officers f where f.officerId =ts.id_officer and date = ?';
    db.all(sql, [dayjs(new Date()).format('YYYY-MM-DD')], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

exports.getNextCustomerInLine = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT min(ticket_num) as NextOne FROM tickets_to_serve where date = ?';
    db.all(sql, [dayjs(new Date()).format('YYYY-MM-DD')], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};


exports.getTicketServed = (officerId) => {
  //get the ticket number
  return new Promise((resolve, reject) => {
    let sql = 'SELECT ticket_num FROM tickets_served WHERE end_time IS NULL AND id_officer = ?';
    db.get(sql, [officerId], (err, row) => {
      if (err) return reject({ "error": err });
      if (row === undefined) {
        return resolve({ error: 'not found.' });
      }
      return resolve(row.ticket_num)
    })
  })
}

exports.updateTicketServed = (officerId, ticketId) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE tickets_served SET end_time = ? WHERE id_officer = ? AND date = ? and ticket_num = ?'
    db.all(sql, [dayjs().format('HH:mm'), officerId, dayjs().format('YYYY-MM-DD'), ticketId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    })
  });
}

exports.getNextTicketToServe = (officerId) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT min(ticket_num) as tn, id_service \
              FROM tickets_to_serve where ticket_num IN \
        (SELECT ticket_num from officers O, counter_service C, tickets_to_serve T \
          where O.counterId = C.counterId AND T.id_service = C.serviceId AND officerId = ?)'
    db.get(sql, [officerId], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    })
  });
}

exports.deleteTicketToServe =  (ticketId) => {
    return new Promise((resolve, reject) => {
      let sql = "delete from tickets_to_serve where ticket_num = ?"
      db.get(sql, [ticketId], (err, row) => {
        if (err) return reject({ "error": err });
        if (row === undefined) {
          return resolve({ error: ' not found.' });
        }
        resolve(row)
      })
    })
}

exports.addTicketServed =  (ticketId, serviceId, officerId) => {
  return new Promise((resolve, reject) => {
    let sql = "insert into tickets_served (id_service, date, ticket_num, start_time, id_officer)  \
    VALUES (?, ?, ?, ?, ?)";
    db.get(sql, [serviceId, dayjs().format('YYYY-MM-DD'), ticketId, dayjs().format('HH:mm'), officerId], (err, row) => {
      if (err) return reject({ "error": err });
      resolve(row)
    })
  })
}

