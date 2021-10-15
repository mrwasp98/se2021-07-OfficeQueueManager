'use strict';

const express = require('express');
const morgan = require("morgan"); // logging middleware
const { check, validationResult } = require('express-validator');
const serviceDao = require('./service-dao');
const counterDao = require('./counter-dao');
const ticketDao = require('./ticket-dao');

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
    check(['tagName', 'serviceTime']).isLength({ min: 1, max: undefined })
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

//insert new counter (with one or more services)
app.post('/api/counters', async (req, res) => {
  const counterId = req.body.counterNum;
  const services = req.body.services;
  try {
    services.forEach(async serviceName => {
      const serviceId = await serviceDao.getId(serviceName);
      const result = await counterDao.createCounter(counterId, serviceId);
      res.json(result);
    });

  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of new counter: ${err}.` });
  }
})

<<<<<<< Updated upstream
//get all services (names)
app.get('/api/services',
  async (req, res) => {
    serviceDao.getNames()
    .then(names => res.json(names.map(x => x.tag_name)))
    .catch(() => res.status(500).end());
  });

=======
//get a ticket of a selected service
app.get('/api/ticket', async (req, res) => {
  const ticket_num = await ticketDao.getNewID(req.params.service);
  ticketDao.createTicketToServe(req.body.service,ticket_num)
  .then((ticket_num)=>{res.json(ticket_num)})
  .catch((err) => {
    res.status(503).json({
      errors: [{ error: `Database error during the creation of new ticket: ${err}.` }],
    });
  });
});
>>>>>>> Stashed changes

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});