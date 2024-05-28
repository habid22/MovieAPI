const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const { name, movie_title, rating } = req.body;
  db.run('INSERT INTO form_responses (name, movie_title, rating) VALUES (?, ?, ?)', [name, movie_title, rating], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM form_responses WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.get('/', (req, res) => {
  db.all('SELECT * FROM form_responses', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = app;
