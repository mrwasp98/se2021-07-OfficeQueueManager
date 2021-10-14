'use strict';

const express = require('express');
const morgan = require("morgan"); // logging middleware
const { check, validationResult } = require('express-validator');
const serviceDao = require('./service-dao');

// init express
const app = new express();
const port = 3001;
// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

/*TEST GET route */
app.get('/api/test', (req, res) => {
  res.json({ textsent: "backend ok!" })
})

//insert new service
app.post('/api/services',
  [
    check(['serviceTime']).isFloat(),
    check(['tagName','serviceTime']).isLength({ min: 1, max: undefined })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const service = {
      tagName: req.body.tagName,
      serviceTime: req.body.serviceTime
    };
    try {
      const result = await serviceDao.createService(service);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of new service: ${err}.` });
    }
  })

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});