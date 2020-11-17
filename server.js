'use strict';

const express = require('express');
const app = express();
const pg = require('pg');
const superagent = require('superagent');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());

require('dotenv').config();

const client = new pg.Client(process.env.DB_URL);

//Decode POST data
app.use(express.urlencoded({ extended: true }));


//set default view engine
app.set('view engine', 'ejs');


//Routes
app.get('/', (request, response) => {
  console.log('like anything');
  response.status(200).send('working');
  //response.send(request.body);
});


client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`In da Matrix. Plugged-in to Port: ${PORT}`);
    });
  }).catch(error => {
    console.log('ERROR', error);
  });

