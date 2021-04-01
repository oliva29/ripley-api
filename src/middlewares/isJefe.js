const {decodeToken} = require('../util/jsonwebtoken')

async function isAdmin(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "NOT JWT: Asegurese de enviar un jwt" })
  } 
    const token = req.headers.authorization.split(" ");
    if (token[0] !== 'Bearer') {
      return res.status(401).send({message: "Asegurese de usar el standard Bearer Token"})
    }
    const payload = await decodeToken(token[1])
    if (payload) {
      req.user = payload.sub
      return next()
    }
    return res.status(401).send({message: "TOKEN INVÁLIDO !!"});
}

module.exports = {
  isAdmin,
};
