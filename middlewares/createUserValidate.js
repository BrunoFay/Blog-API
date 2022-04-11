/* regex reference https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript */
const { checkIfEmailExist } = require('../services/userService');

const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName) return res.status(400).json({ message: '"displayName" is required' });
  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: '"email" is required' });
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const isValidEmail = EMAIL_REGEX.test(email);
  if (!isValidEmail) {
    return res
      .status(400)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};
const validateEmailAlreadyExistsInDb = async (req, res, next) => {
  const { email } = req.body;
  const user = await checkIfEmailExist(email);
  if (user) return res.status(409).json({ message: 'User already registered' });
  next();
};
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};
module.exports = [validateDisplayName,
   validateEmail,
   validatePassword, 
  validateEmailAlreadyExistsInDb];