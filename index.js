const express = require('express');
const app = express();
app.use(express.json());

const server = app.listen(3333, () => {
    const port = server.address().port
    console.log("Listening on port: ", port)
})

require('./src/routes/index')(app);