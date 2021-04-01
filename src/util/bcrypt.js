const bcrypt = require('bcryptjs');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function matchPassword(password, savedPassword) {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  encryptPassword,
  matchPassword,
};
