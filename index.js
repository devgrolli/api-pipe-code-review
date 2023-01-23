const express = require('express');
const app = express();
const PORT = 3333
  
app.get('/', function (req, res) {
   res.send({ msg: 'HOLA'});
})
  
const server = app.listen(PORT, function () {
    const port = server.address().port
   console.log(" Listening : ", port)
})