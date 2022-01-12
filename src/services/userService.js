/* eslint-disable */
const { User } = require('../models');
const JWT = require('../helpers/JWT');

const createUser = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });

  const token = JWT({ email, password });
  
  return { token };
};

// const userLogin = async (user) => {
//   const { email, password } = user;

//   if (email === undefined) return error('"email" is required', 'BAD_REQUEST');

//   if (password === undefined) return error('"password" is required', 'BAD_REQUEST');

//   if (!email.length) return error('"email" is not allowed to be empty', 'BAD_REQUEST');

//   if (!password.length) return error('"password" is not allowed to be empty', 'BAD_REQUEST');

//   const userExists = await User.findOne({ where: { email } });

//   if (!userExists || userExists.dataValues.password !== password) {
//     return error('Invalid fields', 'BAD_REQUEST');
//   }

//   const token = JWT({ email, password });
  
//   return { status: 'OK', token };
// };

module.exports = {
  createUser,
  // userLogin,
};