const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'full_stack_todos',
  user: 'postgres',
  password: 'password'
});

module.exports = {
  getPool: () => pool
};