const { createUser } = require('../database/usersDb');


module.exports = async (request, response) => {
  const { body } = request;

  await createUser(body.email, body.password);

  response.status(201).send();
}