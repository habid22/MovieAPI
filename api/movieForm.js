const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

const apiKey = '61d20bdd'; // Your OMDb API key

// Endpoint to search for a movie
app.get('/search/:title', async (req, res) => {
  const { title } = req.params;
  const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
  const movie = response.data;

  if (movie.Response === 'True') {
    db.get(`SELECT * FROM movies WHERE title = ?`, [movie.Title], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        res.json(row);
      } else {
        db.run(
          `INSERT INTO movies (title, year, plot, poster) VALUES (?, ?, ?, ?)`,
          [movie.Title, movie.Year, movie.Plot, movie.Poster],
          function(err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json({
              id: this.lastID,
              title: movie.Title,
              year: movie.Year,
              plot: movie.Plot,
              poster: movie.Poster
            });
          }
        );
      }
    });
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Endpoint to add a review for a movie
app.post('/reviews', (req, res) => {
  const { movie_id, name, rating, notes } = req.body;
  db.run(
    `INSERT INTO reviews (movie_id, name, rating, notes) VALUES (?, ?, ?, ?)`,
    [movie_id, name, rating, notes],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Endpoint to get reviews for a movie
app.get('/reviews/:movie_id', (req, res) => {
  const { movie_id } = req.params;
  db.all(
    `SELECT * FROM reviews WHERE movie_id = ?`,
    [movie_id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

module.exports = app;
