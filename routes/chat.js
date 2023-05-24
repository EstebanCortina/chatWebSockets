const router = require('express').Router();
const chatController = require('../controllers/chatController.js');
router.get('/', chatController);

module.exports = router;