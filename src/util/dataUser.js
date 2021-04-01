

const { decodeToken } = require('../util/jsonwebtoken');  

async function dataUser(req) {
    try {
      const token = req.headers.authorization.split(" ");
      return await decodeToken(token[1]);
    } catch (error) {
      return false;
    }
  }

module.exports = {
    dataUser
}