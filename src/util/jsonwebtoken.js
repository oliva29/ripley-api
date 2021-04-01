const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../config');

async function createToken(user) {
  try {
    const payload = { user };
    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 180 * 180,
        data: payload,
      },
      secret_jwt,
    );
    return token;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, secret_jwt);
    const userdata = decoded.data.user;
    return userdata;
  } catch (error) {
    return false;
  }
}

async function getParamToken(req) {
  try {
    const token = req.headers.authorization.split(" ");
    const payload = await decodeToken(token[1])
    
    return payload;
  } catch (error) {
    return false;
  }
}

module.exports = {
  createToken,
  decodeToken,
  getParamToken
};
