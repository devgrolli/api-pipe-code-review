const express = require('express');
const axios = require('axios')
const app = express();
app.use(express.json());

const PORT = 3333
const URL_GOOGLE_CHAT = 'https://chat.googleapis.com/v1/spaces/AAAAEelVVHs/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=nMVGivkRRQF__ZzWA-HESQNPMR0iFTB1uuYeQdHZwDM%3D'
const headersGoogle = { 'Content-Type': 'application/json'}

const findLabel = (map, val) => {
    for (let [k, v] of map) {
      if (v === val) { 
        return true; 
      }
    }  
    return false;
}
  
app.get('/', (req, res) => {
    res.status(201).json({ msg: 'HOLA'});
})

app.post('/', (req, res) => {
    const response_gitlab = req.body
    const arrayLabels = response_gitlab.merge_request.labels
    const nameLabel = 'Code Review'


    console.log('É ARRAY?', Array.isArray(arrayLabels))
    console.log('ESTÁ VAZIO?', !arrayLabels.length)
    console.log('array', arrayLabels)

    if(Array.isArray(arrayLabels) && !arrayLabels.length){
        res.status(202).json({ msg: 'DEU RUIM NO ARRAY'});
    }else{
        const resutLabels = findLabel(arrayLabels, nameLabel)
        if(!resutLabels){
            res.status(200).json({ msg: `NÃO POSSUI TAG ${nameLabel}`});
        }
        console.log('não passou aqui')
        const body = {
            cards: [{
                header: {
                    title: `TESTE CODE REVIEW - Repositório ${response_gitlab.repository.name}`,
                    subtitle: `Branch do Code Review: ${response_gitlab.merge_request.source_branch}`,
                    imageStyle: 'AVATAR'
                },
                sections: [{
                    widgets: [{
                        buttons: [{
                            textButton: {
                                text: `LINK CODE REVIEW - ${response_gitlab.merge_request.source_branch}`,
                                onClick: {
                                    openLink: { url: response_gitlab.merge_request.url }
                                }
                            }
                        }]
                    }]
                }]
            }]
        }

        axios({
            method: 'post',
            url: URL_GOOGLE_CHAT,
            headers: headersGoogle,
            data: body
        }).then((res) => {
            res.status(201).json({ msg: 'Alerta de Code Review enviado para o Google Chat', info: res});
        }, (err) => {
            res.status(404).json({ msg: 'Ocorreu algum problema com a requisição par ao Google Chat', erro: err});
        });
    }
})
  
const server = app.listen(PORT, () => {
   const port = server.address().port
   console.log("Listening on port: ", port)
})
