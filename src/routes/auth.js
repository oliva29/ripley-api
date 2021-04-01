const router = require('express').Router();
const { OAuthRegister, OAuthLocal } = require('../controllers/authController');
 
router.post('/login', OAuthLocal);
router.post('/register', OAuthRegister);

 
module.exports = router;
