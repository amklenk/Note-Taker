//requires
const express = require('express');
const data = require('./db/db.json');
const fs = require('fs');
const path = require('path');

//express and port variables
const app = express();
const PORT = process.env.PORT || 3001;

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

function findById(id, data) {
    const result = data.filter(note => note.id === id)[0];
    return result;
  }

function createNewNote(body, data) {
    const note = body;
    data.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(data, null, 2)
      );

  return note;
  }

  function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

app.get('/api/data/:id', (req, res) => {
    const result = findById(req.params.id, data);
    if (result){
     res.json(result);   
    } else{
        res.send(404);
    }
  });

app.post('/api/data', (req, res) => {
    req.body.id = uuid();
    if (!validateNote(req.body)) {
        res.status(400).send('This note is not properly formatted.');
      } else {
        const newNote = createNewNote(req.body, data);
        res.json(newNote);
      }
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });