const router = require('express').Router();

const nameController = require('../controllers/nameController.js');
router.get('/', nameController);

module.exports = router;