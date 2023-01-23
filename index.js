const axios = require('axios')
const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3333
const URL_GOOGLE_CHAT = 'https://chat.googleapis.com/v1/spaces/AAAAEelVVHs/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=nMVGivkRRQF__ZzWA-HESQNPMR0iFTB1uuYeQdHZwDM%3D'
const headersGoogle = { 'Content-Type': 'application/json'}
  
app.get('/', (req, res) => {
    res.status(201).json({ msg: 'HOLA'});
})

app.post('/', (req, res) => {
    const response_gitlab = req.body
    const labels = response_gitlab.merge_request.labels

    console.log(labels)
    // labels.map((label, i) => {
    //     console.log('[forEach]', label, i);
    //     label
    // })
    console.log('É ARRAY', Array.isArray(labels))
    console.log('TÁ VAZIO?', !labels.length)

    if(Array.isArray(labels) && !labels.length){
        res.status(404).json({ msg: 'DEU RUIM NO ARRAY'});
    }else{
        console.log(labels.title.includes('Code Review'))
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
        }).then((response) => {
            console.log('DEU BOM', response.body);
        }, (error) => {
            console.log('ERROR', error);
        });

        res.status(201).json({ msg: 'Alerta de Code Review enviado para o Google Chat'});
    }
})
  
const server = app.listen(PORT, () => {
   const port = server.address().port
   console.log("Listening on port: ", port)
})
