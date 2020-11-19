'use strict';

const express = require('express');
const app = express();
const pg = require('pg');
const superagent = require('superagent');
const cors = require('cors');
var Owlbot = require('owlbot-js');

const PORT = process.env.PORT || 3000;

app.use(cors());

require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);

//Decode POST data
app.use(express.urlencoded({ extended: true }));
var obClient = Owlbot(process.env.OWLBOT_API);

//set default view engine
app.set('view engine', 'ejs');

//Routes
app.get('/', (request, response) => {
  response.render('pages/index');
});

app.post('/searchWord', searchHandler);





let def = '';

let wordArr = [];

function searchHandler(request, response) {
  
  const searchedWord = request.body.search;
  console.log('Searched word: ', searchedWord);

  // obClient.define('owl').then(function (result) {
  //   console.log('owlb: ', result);
  // }).catch(error => {
  //   console.log('error', error);
  // });


  let dAPI = process.env.DICT_API;
  let URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=${dAPI}`;
  superagent.get(URL)
    .then(data => {
      console.log('dict: ', data.body[0].shortdef);
      def = data.body[0].shortdef;
    });


  let qAPI = process.env.QUOTE_API;
  let URL2 = `https://favqs.com/api/quotes/?filter=${searchedWord}`;
  superagent.get(URL2).set('Authorization', `Bearer ${qAPI}`).then(data => {
    console.log('quotes: ', data.body.quotes);
  });

  // let tAPI

  // let word = '';

  // let sentence = '';
  // let img = '';
  // let quote = '';
  // wordArr.push(new SavedWord(word, def, sentence, img, quote));
  response.render('pages/searchResults');
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`In da Matrix. Plugged-in to Port: ${PORT}`);
    });
  }).catch(error => {
    console.log('ERROR', error);
  });

function SavedWord(word, def, sentence, img, quote) {
  this.word = word;
  this.def = def;
  this.sentence = sentence;
  this.img = img;
  this.quote = quote;
}

