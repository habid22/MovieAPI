const express = require('express');
const app = express();
const movieForm = require('./api/movieForm');

app.use('/api/form', movieForm);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
