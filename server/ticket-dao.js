'use strict';
const sqlite = require("sqlite3");
const db = new sqlite.Database('database.db', (err) => { if (err) throw err; });
const dayjs = require('dayjs');

  //Generate a new surveyID idSurvey
exports.getNewID = function (id_service) {     
    let now = dayjs();   
    return new Promise((resolve, reject) => {
      let sql = 'SELECT MAX(ticket_num) AS result FROM tickets_to_serve WHERE id_service = ? AND date = ?';
      db.all(sql, [id_service,now.format('DD/MM/YYYY')], (err, rows) => {
        if (err)
          reject(err);
        else{
            console.log(rows.map(record => record.result)[0]);
          resolve(rows.map(record => record.result)[0] + 1);
        }
      });
    });
  }

  function TicketToServe(id_service, ticket_num) {
    this.id_service = id_service;
    this.ticket_num = ticket_num;
    this.date = dayjs().format('DD/MM/YYYY');
  }

  //Generate new Survey object
const createTicketToServe = function (row) {
    return new TicketToServe(row.id_service, row.ticket_num);
  }

  //Post a new survey entry into database
exports.createTicketToServe = function (id_service, ticket_num) {
    const ticket = createTicketToServe({ id_service: id_service, ticket_num: ticket_num });
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO tickets_to_serve(id_service,date,ticket_num) VALUES(?,?,?)';
      db.all(sql, [ticket.id_service,ticket.date,ticket.ticket_num], function (err) {
        if (err){
          console.log(err);
          reject(err);
        }
        else
          resolve(ticket_num);
      });
    });
  }


