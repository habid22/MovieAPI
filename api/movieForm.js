const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { name, movie_title, rating } = req.body;

  // Fetch movie information from OMDb API
  const apiKey = '61d20bdd';
  const response = await axios.get(`http://www.omdbapi.com/?t=${movie_title}&apikey=${apiKey}`);
  const movie = response.data;

  const movieYear = movie.Year || '';
  const moviePlot = movie.Plot || '';
  const moviePoster = movie.Poster || '';

  db.run(
    `INSERT INTO form_responses (name, movie_title, rating, movie_year, movie_plot, movie_poster)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, movie_title, rating, movieYear, moviePlot, moviePoster],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
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
