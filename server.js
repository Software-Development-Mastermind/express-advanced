const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require("body-parser");

const { Pool } = require('pg');

const pool = new Pool({
  // TBD
  host: 'localhost',
  database: 'full_stack_todos',
  user: 'postgres',
  password: 'password'
});

const port = 3000;

//Middleware
app.use(bodyParser.json());

//Serving React Build via Express.js
app.use('/', express.static(path.join(__dirname, "client", "build")));

app.post('/api/auth/login', (request, response) => {
  response.send({}); 
});

app.post('/api/auth/register', async (request, response) => {
  const { body } = request;

  const dbResponse = await pool.query(`
    INSERT INTO users 
      (id, email, password) VALUES ($1, $2, $3) RETURNING id;
  `, [ body.id, body.email, body.password ]);

  response.send(dbResponse.rows[0]);
});

app.get('/api/todos', async (request, response) => {
  const dbResponse = await pool.query('SELECT * FROM todos');

  response.send(dbResponse.rows); 
});

app.post('/api/todos', (request, response) => {
  const { body } = request;

  pool.query(`
    INSERT INTO todos 
      (id, text, user_id) VALUES ($1, $2, $3);
  `, [ body.id, body.text, body.userId ])
  response.status(201).send(); 
});

app.delete('/api/todos/:id', (request, response) => {
  pool.query(`
    DELETE FROM todos WHERE id = $1
  `, [ request.params.id ])
  response.send();
});

//Catch All
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});