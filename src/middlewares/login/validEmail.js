const code = require('../../helpers/statusCode');
const { User } = require('../../models');

const validateEmail = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (email === undefined) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"email" is required' });
  } 
  
  if (!email.length) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"email" is not allowed to be empty' });
  } 
  
  // Abaixo, função que checa se usuário não existe, para atender requisito 2
  const userExists = await User.findOne({ where: { email } });
  
  if (!userExists || userExists.dataValues.password !== password) {
    return res.status(code.BAD_REQUEST)
    .json({ message: 'Invalid fields' });
  }
  next();
};

module.exports = {
  validateEmail,
};
