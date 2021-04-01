const router = require('express').Router();
const { getClient, setClient, getKpi } = require('../controllers/clientController');
 
router.get('/', getClient);  
router.post('/', setClient); 
router.get('/getKpi', getKpi); 

module.exports = router;
