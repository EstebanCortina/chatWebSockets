const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send("Inicio");
})

const chatRouter = require('./chat.js');
router.use('/chat', chatRouter);

const nameRouter = require('./name.js');
router.use('/name', nameRouter);

module.exports = router;