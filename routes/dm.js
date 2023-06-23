const router = require('express').Router();

const dmController = require('../controllers/dmController');
const dmControllerPage = require('../controllers/dmControllerPage');

router.post('/', dmController);
router.get('/', dmControllerPage);

module.exports = router;