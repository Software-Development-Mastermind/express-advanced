const pool = require('./dbPoolService').getPool();

const getTodosByUserId = async (userId) => {
  var dbResponse = await pool.query('SELECT * FROM todos WHERE user_id = $1', [ userId ]);

  return dbResponse.rows;
}

const createTodo = async (text, userId) => {
  await pool.query(`
    INSERT INTO todos 
      (text, user_id) VALUES ($1, $2);
  `, [ text, userId ])  
}

const deleteTodo = async (id) => {
  await pool.query(`
    DELETE FROM todos WHERE id = $1
  `, [ id ])
}

module.exports = {
  getTodosByUserId,
  createTodo,
  deleteTodo
}