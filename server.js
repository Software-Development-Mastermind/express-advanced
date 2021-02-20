const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require("body-parser");

const port = 3000;

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'full_stack_todos',
  user: 'postgres',
  password: 'password'
});

//Middleware
app.use(bodyParser.json());
//Serving React Build via Express.js
app.use('/', express.static(path.join(__dirname, "client", "build")));

// LOGIN A USER
app.post('/api/auth/login', async (request, response) => {
  const { body } = request;

  const dbResponse = await pool.query(`
    SELECT * FROM users WHERE email = $1;
  `, [ body.email ]);

  if (dbResponse.rows.length === 0) { 
    return response.status(403).send({ errorMessage: "User/password issue"}); 
  }

  const isMatchingPassword = dbResponse.rows[0].password === body.password;
  if (!isMatchingPassword) {
    return res.status(403).send({ errorMessage: "User/password issue"});
  }

  const user = dbResponse.rows[0];
  response.send({ id: user.id, email: user.email }); 
});

// REGISTER A NEW USER
app.post('/api/auth/register', async (request, response) => {
  const { body } = request;

  await pool.query(`
    INSERT INTO users 
      (email, password) VALUES ($1, $2);
  `, [ body.email, body.password ]);

  response.status(201).send();
});

// GET TODOS
app.get('/api/todos', async (request, response) => {
  const dbResponse = await pool.query('SELECT * FROM todos WHERE user_id = $1', [ request.query.user_id ]);

  response.send(dbResponse.rows); 
});

// CREATE NEW TODOS
app.post('/api/todos', (request, response) => {
  const { body } = request;

  pool.query(`
    INSERT INTO todos 
      (text, user_id) VALUES ($1, $2);
  `, [ body.text, body.userId ])
  response.status(201).send(); 
});

// DELETE TODOS
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