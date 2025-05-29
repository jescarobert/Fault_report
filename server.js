const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'demo-secret', resave: false, saveUninitialized: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/report', (req, res) => res.sendFile(path.join(__dirname, 'views', 'report.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin_login.html')));

app.post('/report', (req, res) => {
  const { fault_title, description, location, datetime } = req.body;
  db.run(`INSERT INTO faults (fault_title, description, location, datetime) VALUES (?, ?, ?, ?)`,
    [fault_title, description, location, datetime], () => {
      res.send('Fault reported successfully. <a href="/">Report another</a>');
    });
});

app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM admins WHERE username = ? AND password = ?`, [username, password], (err, row) => {
    if (row) {
      req.session.admin = true;
      res.redirect('/admin-dashboard');
    } else {
      res.send('Invalid credentials. <a href="/admin">Try again</a>');
    }
  });
});

app.get('/admin-dashboard', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin');
  db.all(`SELECT * FROM faults`, (err, rows) => {
    let html = `<h1>Reported Faults</h1><ul>`;
    rows.forEach(row => {
      html += `<li><a href="/fault/${row.id}">${row.fault_title} at ${row.location}</a></li>`;
    });
    html += `</ul><a href="/index">Logout</a>`;
    res.send(html);
  });
});

app.get('/fault/:id', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin');
  db.get(`SELECT * FROM faults WHERE id = ?`, [req.params.id], (err, row) => {
    if (row) {
      res.send(`<h2>${row.fault_title}</h2><p>${row.description}</p><p>${row.location}</p><p>${row.datetime}</p><a href="/admin-dashboard">Back</a>`);
    } else {
      res.send('Fault not found.');
    }
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
