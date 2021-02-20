const { getUserByEmail } = require('../database/usersDb');

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  const isMatchingPassword = user.password === password;
  if (!user || !isMatchingPassword) {
    const error = new Error("Either user does not exist or password does not match");
    error.status = 403;
    throw error;
  }

  return user;
}

module.exports = { 
  loginUser
}