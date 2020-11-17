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
  response.render('pages/index');
});

app.post('/searchWord', searchHandler);

let wordArr = [];
function searchHandler(request, response) {
  const searchedWord = request.body.search;
  const dAPI = process.env.DICT_API;
  const URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=${dAPI}`;

  let word = '';
  let def = '';
  let sentence = '';
  let img = '';
  let quote = '';
  
  superagent.get(URL)
    .then(data => {
      def = data.body[0].shortdef;
    });

  wordArr.push(new SavedWord(word, def, sentence, img, quote));
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`In da Matrix. Plugged-in to Port: ${PORT}`);
    });
  }).catch(error => {
    console.log('ERROR', error);
  });

  function SavedWord(word, def, sentence, img, quote){
    this.word = word;
    this.def = def;
    this.sentence = sentence;
    this.img = img;
    this.quote = quote;
  }

