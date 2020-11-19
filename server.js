'use strict';

const express = require('express');
const app = express();
const pg = require('pg');
const superagent = require('superagent');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());

require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);

//Decode POST data
app.use(express.urlencoded({ extended: true }));


//set default view engine
app.set('view engine', 'ejs');


//Routes
app.get('/', (request, response) => {
  response.render('pages/index');
});

app.post('/searchWord', searchHandler);

var Owlbot = require('owlbot-js');

var obClient = Owlbot(process.env.OWLBOT_API);

let def = '';

let wordArr = [];
function searchHandler(request, response) {
  const searchedWord = request.body.search;
  let dAPI = process.env.DICT_API;
  let URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=${dAPI}`;
  superagent.get(URL)
    .then(data => {
      def = data.body[0].shortdef;
    });
  obClient.define(`${searchedWord}`).then(function (result) {
    // console.log(result);
  });
  let qAPI = process.env.QUOTE_API;
  let URL2 = `https://favqs.com/api/quotes/?filter=${searchedWord}`;
  superagent.get(URL2).set('Authorization', `Bearer ${qAPI}`).then(data => {
    //console.log(data.body.quotes);
  });

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "google-translate1.p.rapidapi.com",
      "x-rapidapi-key": "4078ba43c0msh8865d8db5c15988p19b1e8jsn48090cdc8da7",
      "accept-encoding": "application/gzip",
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "source": "en",
      "q": "Hello, world!",
      "target": "es"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  // let tAPI





  // let word = '';

  // let sentence = '';
  // let img = '';
  // let quote = '';
  // wordArr.push(new SavedWord(word, def, sentence, img, quote));
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

