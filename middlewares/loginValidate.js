const { User } = require('../modelsSequelize/models');

const loginEmailValidate = (req, res, next) => {
  const { email } = req.body;
  if (!email && email !== '') return res.status(400).json({ message: '"email" is required' });
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  next();
};
const loginPasswordValidate = (req, res, next) => {
  const { password } = req.body;
  if (!password && password !== '') {
    return res.status(400).json({ message: '"password" is required' }); 
}
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

const loginUserValidate = async (req, res, next) => {
  const { email, password } = req.body;
  const checkIfUserExistInDb = await User.findOne({ where: { email, password } });
  if (!checkIfUserExistInDb) return res.status(400).json({ message: 'Invalid fields' });
  next();
};
module.exports = [loginEmailValidate, loginPasswordValidate, loginUserValidate];