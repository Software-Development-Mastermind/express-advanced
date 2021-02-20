const pool = require('./dbPoolService').getPool();

const getUserByEmail = async (email) => {
  const dbResponse = await pool.query(`
    SELECT * FROM users WHERE email = $1;
  `, [ email ]);

  return dbResponse.rows[0];
}

const createUser = async (email, password) => {
  const dbResponse = await pool.query(`
  INSERT INTO users 
    (email, password) VALUES ($1, $2) RETURNING *;
  `, [ email, password ]);

  return dbResponse.rows[0];
}

module.exports = {
  getUserByEmail,
  createUser
}