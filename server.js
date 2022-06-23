const express = require('express');
const { data } = require('./db/db.json');

const app = express();

app.get('/api/data', (req, res) => {
    res.send('Hello!');
  });


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });