const express = require('express');
const data = require('./db/db.json');

const app = express();


function filterByQuery(query, data) {
    let filteredResults = data;
    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
  }

app.get('/api/data', (req, res) => {
    let results = data;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
  });




app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });