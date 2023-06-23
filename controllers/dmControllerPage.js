const path = require('path');
module.exports = (req, res) => {
  console.log(req.query.parametro1);
  //res.status(200).send("asdasd");
  //res.status(200).sendFile(path.join(__dirname, '../views/dm.html'))
  res.send(req.query.parametro1);
}
