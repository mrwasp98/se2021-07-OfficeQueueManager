'use strict';

const express = require('express');
const morgan = require("morgan"); // logging middleware

// init express
const app = new express();
const port = 3001;
// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

/*TEST GET route */
app.get('/api/test', (req, res)=>{
    res.json({textsent: "backend ok!"})
})
// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});