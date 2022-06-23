//requires
const express = require('express');
const notes = require('./db/db.json');
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
app.use(express.static('public'));

function filterByQuery(query, notes) {
    let filteredResults = notes;
    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
  }

function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
  }

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
      );

  return note;
  }

function deleteNote(notes){
fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2)
  );

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

app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result){
     res.json(result);   
    } else{
        res.send(404);
    }
  });

  app.delete('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    // console.log(req.params.id);
    if (result){
    let filteredList = notes.filter((note) => note.id !== req.params.id);
    console.log(filteredList);
// //    return console.log(notes.filter((note) => {note.id !== req.params.id}));
   deleteNote(filteredList);
    }
  });

app.post('/api/notes', (req, res) => {
    req.body.id = uuid();
    if (!validateNote(req.body)) {
        res.status(400).send('This note is not properly formatted.');
      } else {
        const newNote = createNewNote(req.body, notes);
        res.json(newNote);
      }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });