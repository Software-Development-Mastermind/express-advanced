const { getTodosByUserId, createTodo, deleteTodo } = require('../database/todosDb');

const get = async (request, response, next) => {
  response.send(await getTodosByUserId(request.query.user_id)); 
};

const post = async (request, response) => {
  const { body } = request;

  await createTodo(body.text, body.userId); 

  response.status(201).send(); 
};

const deleteFn = async (request, response) => {
  await deleteTodo(request.params.id);
  response.send();
}

module.exports = {
  get,
  post,
  deleteFn
}