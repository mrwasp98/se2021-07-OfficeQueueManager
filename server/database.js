'use strict';

const sqlite = require('sqlite3');

const database = new sqlite.Database('database.db', (err) => {
    if (err) throw err;
});

module.exports = database;