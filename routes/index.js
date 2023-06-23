const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send("Inicio");
})


const chatRouter = require('./chat.js');
router.use('/chat', chatRouter);

const dmRouter = require('./dm');
router.use('/dm', dmRouter);

module.exports = router;