const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('faults.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS faults (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fault_title TEXT,
    description TEXT,
    location TEXT,
    datetime TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

  db.run(`INSERT OR IGNORE INTO admins (id, username, password) VALUES (1, 'admin', '1234')`);
});

module.exports = db;
