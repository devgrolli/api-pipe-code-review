// require('dotenv').config()
const express = require('express')
// const cors = require("cors");
const app = express()

// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200,
//  }
 
// app.use(cors(corsOptions))
// app.use(express.json())

app.listen(5001, () => console.log('api running on port 5001'))

app.get('/', (res) => {
    res.status(200).json({msg: 'Bem vindo a nossa API'})
})

