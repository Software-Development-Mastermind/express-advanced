const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require("body-parser");

const port = 3000;

//Middleware

app.use(bodyParser.json());
 
//Serving React Build via Express.js
app.use('/', express.static(path.join(__dirname, "client", "build")));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth/', authRoutes);

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos/',todoRoutes);


//Catch All
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});