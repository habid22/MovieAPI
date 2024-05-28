const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE form_responses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, movie_title TEXT, rating INTEGER)");
});

module.exports = db;
