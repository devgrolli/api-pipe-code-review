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

    console.log('LABEL', response_gitlab.source.labels)
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
                            text: `ACESSE O LINK DO GITLAB ${response_gitlab.merge_request.source_branch}`,
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
        // console.log('RESPONSE', res.body)
        console.log('DEU BOM', response.body);
    }, (error) => {
        console.log('ERROR', error);
    });

    const { flag } = req.body
    res.status(201).json({ msg: `Flag GITLAB: ${flag}`});
})
  
const server = app.listen(PORT, () => {
   const port = server.address().port
   console.log("Listening on port: ", port)
})
