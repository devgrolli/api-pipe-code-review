const express = require('express')
const app = express()
const PORT = 3333

app.use(express.json())

app.get('/', (response) => {
    return response.json({msg: 'Bem vindo a nossa API'})
})

app.listen(PORT,  () => {
    console.log(`Server is running on port ${PORT}`);
});
