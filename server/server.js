'use strict';

const express = require('express');
const morgan = require("morgan"); // logging middleware
const { check, validationResult } = require('express-validator');
const serviceDao = require('./service-dao');
const counterDao = require('./counter-dao');
const ticketDao = require('./ticket-dao');
const officerDao = require('./officer-dao');

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

//get the active officers
app.get('/api/officers', async (req, res) => {
  officerDao.getActOfficers()
    .then(officers => res.status(200).json(officers))
    .catch(() => res.status(500).json({error: 'error connection db'}));
});

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

//get all services (names)
app.get('/api/services',
  async (req, res) => {
    serviceDao.getNames()
    .then(names => res.json(names.map(x => x.tag_name)))
    .catch(() => res.status(500).end());
  });

//add a new ticket
  app.post('/api/addTicket', async (req, res) => {
    console.log(req.body.service)
    const service_id = await serviceDao.getId(req.body.service)
    .catch((err)=> res.status(503).json({
      errors: [{ error: `Database error during the creation of new ticket: ${err}.` }],
    }))
    if(!service_id.error){
      const ticket_num = await ticketDao.getNewID(service_id);
      ticketDao.createTicketToServe(service_id,ticket_num)
      .then((ticket_num)=>{res.json(ticket_num)})
      .catch((err) => {
        res.status(503).json({
          errors: [{ error: `${service_id}: ${err}.` }],
        });
      });
    }  
  });

  
//get served customers
app.get('/api/Customer',
async (req, res) => { 
  ticketDao.getServedCustomer()
  .then(names => res.json(names))
  .catch(() => res.status(500).end());
});


  
//insert served tickets
app.post('/api/ticket', async (req, res) =>{
  const ticket_num = req.body.ticket_num;
  const id_service = req.body.id_service;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const id_officer = req.body.id_officer;
  const date = req.body.date;
  ticketDao.createTicketServed(ticket_num,id_service,date,start_time,end_time,id_officer)
    .then((ticket_num)=>{res.json(ticket_num)})
    .catch((err) => {
      res.status(503).json({
        errors: [{ error: `Database error during the creation of new ticket served: ${err}.` }],
      });
    });
  
})

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.put('/api/officer/:officerId/status/:stat', async(req, res) =>{
  try{
    await officerDao.updateStatus(req.params.officerId, req.params.stat);
    res.status(201).end();
  } catch(err) {
    res.status(503).json({error: `Database error ${err}.`});
  }
});