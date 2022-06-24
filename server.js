//requires
const express = require('express');
var notes = require('./db/db.json');
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

//functions
//filters notes by query
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

//parses through data to find a note by id
function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
  }

//creates a new note by pushing an entry to the data array and syncing the file
function createNewNote(body, notes) {
    const note = body;
    notes.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
      );

  return note;
  }

//deletes a note by syncing the file after it is filtered in the delete method
// function deleteNote(notes){
// fs.writeFileSync(
//     path.join(__dirname, './db/db.json'),
//     JSON.stringify(notes, null, 2)
//   );
// // location.reload();
// }

//validates if user data is entered correctly
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

//app methods
//api
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
    var oldNotes = notes;
    let filteredList = oldNotes.filter((note) => note.id !== req.params.id);
    console.log(filteredList);

fs.writeFileSync('./db/db.json', JSON.stringify(filteredList));
    notes = filteredList; 
    JSON.stringify(filteredList, null, 2);
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
//html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
//listen on heroku or localhost3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });