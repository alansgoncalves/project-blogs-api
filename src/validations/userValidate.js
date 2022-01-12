// const error = require('../helpers/errors');
// const { User } = require('../models');

// const validateDisplay = (displayName) => {
//   if (displayName.length < 8) {
//     return error('"displayName" length must be at least 8 characters long', 'BAD_REQUEST');
//   }
//   return false;
// };

// const validateEmail = async (email) => {
//   if (email === undefined) return error('"email" is required', 'BAD_REQUEST');

//   if (!/^[a-z\d]+@[a-z\d]+\.com$/.test(email)) {
//     return error('"email" must be a valid email', 'BAD_REQUEST');
//   }

//   const userExists = await User.findOne({ where: { email } });

//   if (userExists) return error('User already registered', 'CONFLICT');

//   return false;
// };

// const validatePassword = (password) => {
//   console.log(password);
//   if (password === undefined) {
//     return error('"password" is required', 'BAD_REQUEST');
//   }

//   if (password.length !== 6) {
//     return error('"password" length must be 6 characters long', 'BAD_REQUEST');
//   }
//   return false;
// };

// module.exports = {
//   validateDisplay,
//   validateEmail,
//   validatePassword,
// };