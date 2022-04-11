require('dotenv').config();
const jwt = require('jsonwebtoken');

const userLogin = (userInfos) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userInfos }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = userLogin;