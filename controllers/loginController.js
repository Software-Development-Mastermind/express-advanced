const { getUserByEmail } = require('../database/usersDb');
const { loginUser } = require('../services/loginService');

module.exports = async (request, response) => {
  const { body } = request;

  try {
    const user = await loginUser(body.email, body.passowrd);
    response.send({ id: user.id, email: user.email });
  } catch (err) {
    response.status(err.status || 500).send({errorMessage: err.message || 'Internal Server Error'})
  }
}