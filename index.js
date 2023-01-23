// require('dotenv').config()
const express = require('express')
// const cors = require("cors");
const app = express()
app.use(express.json())

// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200,
//  }
 
// app.use(cors(corsOptions))

app.get('/', (resonse) => {
    return resonse.json({message: "Server is up"});
})

app.post('/', (request, resonse) => {
    const { name, date } = request.body;
    return resonse.json({name, date});
})

app.listen(3333, console.log('listening on port 3333'))
