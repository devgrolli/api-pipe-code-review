const express = require('express');
const app = express();
app.use(express.json());
const PORT = 444
  
app.get('/', (req, res) => {
    res.status(201).json({ msg: 'HOLA'});
})

app.post('/', (req, res) => {
    const { flag } = req.body
    res.status(201).json({ msg: `Flag GITLAB: ${flag}`});
})
  
const server = app.listen(PORT, () => {
   const port = server.address().port
   console.log("Listening on port: ", port)
})