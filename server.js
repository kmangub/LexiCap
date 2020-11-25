'use strict';

//dependencies
const express = require('express');
const app = express();
const pg = require('pg');
const superagent = require('superagent');
const cors = require('cors');
const Owlbot = require('owlbot-js');
const methodOverride = require('method-override');

//declare our PORT
const PORT = process.env.PORT || 3000;

//bring in da cors
app.use(cors());

//use method override
app.use(methodOverride('_method'));


//make public folder visible
app.use(express.static('public'));


//configure dotenv environmental variables
require('dotenv').config();

//create new clients
const client = new pg.Client(process.env.DATABASE_URL);
const obClient = Owlbot(process.env.OWLBOT_API);

//Decode POST data
app.use(express.urlencoded({ extended: true }));


//set default view engine
app.set('view engine', 'ejs');

//Routes
app.get('/', (request, response) => {
  console.log('started');
  response.render('pages/index');
});
app.post('/searchWord', searchHandler);
app.post('/add', addHandler);
app.get('/collection', collectionHandler);
app.delete('/delete/:id', deleteHandler);
app.get('/createCard', createCardHandler);
app.post('/card', makeCard)


//route handlers
function searchHandler(request, response) {
  try {
    //creating variables
    const searchedWord = request.body.search;

    //Dictionary API call
    let dAPI = process.env.DICT_API;
    let dURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=${dAPI}`;
    const pooperagent = superagent.get(dURL)
      .then(data => {

        //checks if word is not defined and redirects user to 'word not found page' if so
        if(data.body[0].shortdef === undefined){
          return response.render('pages/wordDetails');
        }
        console.log('sound route: ', data.body[0].hwi.prs[0].sound.audio);
        return data.body[0]

      });

    //Thesaurus API call
    let tAPI = process.env.THES_API;
    let tURL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchedWord}?key=${tAPI}`;
    const scooperagent = superagent.get(tURL)
      .then(data => {
        let syn = data.body[0].meta ? data.body[0].meta.syns[0] : ['No Common Synonyms'];
        return syn;
      });

    //Quote API call
    let qAPI = process.env.QUOTE_API;
    let URL2 = `https://favqs.com/api/quotes/?filter=${searchedWord}`;
    const duperagent = superagent.get(URL2).set('Authorization', `Bearer ${qAPI}`).then(data => {
      return data.body.quotes[0];
    });

    //OwlBot API call requires its own client setup
    const owlbutt = obClient.define(searchedWord).then(function (result) {      
      return result;
    }).catch(error => {
      console.log('error', error);
    });

    //Promise.all resolves allllll promises, then returns their data in a single large array
    Promise.all([pooperagent, scooperagent, duperagent, owlbutt])
      .then(results => {

        //checks if word is not found in owlbot and redirects user to 'word not found page' if so
        if(results[3] === undefined){
          return response.render('pages/wordDetails');
        }

        response.render('pages/searchResults', { word: results, searchedWord: searchedWord });
      });
  }
  catch (error) {
    console.log('ERROR', error);
    response.status(500).send('So sorry, something went wrong.');
  }
}

function addHandler(request, response) {

  let addWordSQL = 'INSERT INTO words (word, pronunciation,prtSpeech, sound, definitions, synonyms, example, image_url, quote, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *;';


  const parsedDefs = JSON.stringify(request.body.definitions);
  const parsedSyns = JSON.stringify(request.body.synonyms);

  const sqlParams = [request.body.word, request.body.pronunciation, request.body.prtspeech, request.body.sound, parsedDefs, parsedSyns, request.body.example, request.body.image_url, request.body.quote, request.body.author];

  client.query(addWordSQL, sqlParams).then(() => response.redirect('/collection'));
}

function collectionHandler(request, response) {
  let getTableSQL = 'SELECT * from words ORDER BY word ASC;';
  client.query(getTableSQL)
    .then(results => {
      results.rows.forEach(object => {
        let parseMe = JSON.parse(object.definitions);
        object.definitions = parseMe;
        let parseMe2 = JSON.parse(object.synonyms);
        object.synonyms = parseMe2;
      });
      response.render('pages/collection', { wordList: results.rows });
    });
}

function deleteHandler(request, response) {
  const SQL = 'DELETE from words WHERE id = $1;';
  const sqlParams = [request.body.id];

  client.query(SQL, sqlParams).then(()=>{ });


  let getTableSQL = 'SELECT * from words;';
  client.query(getTableSQL)
    .then(results => {
      results.rows.forEach(object => {
        let parseMe = JSON.parse(object.definitions);
        object.definitions = parseMe;
        let parseMe2 = JSON.parse(object.synonyms);
        object.synonyms = parseMe2;
      });
      response.render('pages/collection', { wordList: results.rows });
    });

}

function createCardHandler(request, response) {
  response.render('pages/createCard');
}

function makeCard(request, response) {
  let addCardSQL = 'INSERT INTO words (word, definitions, synonyms) VALUES ($1, $2, $3) returning *;';

  const parsedDefCard = JSON.stringify(request.body.definitions);
  const parsedSynsCard = JSON.stringify(request.body.synonyms);

  console.log(request.body.word)
  console.log(request.body.definitions)

  const sqlParams = [request.body.word, parsedDefCard, parsedSynsCard];

  client.query(addCardSQL, sqlParams)
    .then(results => {
      console.log(results.rows);
      response.redirect('/collection')
    });
}






//connect to client
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`In da Matrix. Plugged-in to Port: ${PORT}`);
    });
  }).catch(error => {
    console.log('ERROR', error);
  });

