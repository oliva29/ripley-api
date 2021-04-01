const router = require('express').Router();
const { OAuthRegister, OAuthLocal } = require('../controllers/auth.controller');
 
router.post('/login', OAuthLocal);
router.post('/register', OAuthRegister);

router.get('/', (req, res) => {
    res.send('Este es el home')
})

module.exports = router;
