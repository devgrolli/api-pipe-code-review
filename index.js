const express = require('express');
const axios = require('axios')
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
    const arrayLabels = response_gitlab.merge_request.labels
    const nameLabel = 'Code Review'

    if(Array.isArray(arrayLabels) && !arrayLabels.length){
        res.status(202).json({ msg: 'DEU RUIM NO ARRAY'});
    }else{
        const valid = arrayLabels.find(item => item.title === nameLabel);

        if (!valid == null){
            return res.status(200).json({ msg: `Não há label de ${nameLabel} no Merge Request`});
        }

        const body = {
            cards: [{
                header: {
                    title: `Aberto Code Review - ${response_gitlab.repository.name}`,
                    subtitle: 'Acompanhe o code review por aqui',
                    imageUrl: 'https://cdn0.iconfinder.com/data/icons/designer-skills/128/node-js-512.png',
                    imageStyle: 'AVATAR'
                },
                sections: [
                    {
                        widgets: [{
                            textParagraph: {
                              text: `
                                <b>Usuário: <font color=\"#66CDAA\"> ${response_gitlab.user.name}</font></b>

                                <b>Branch</b>: ${response_gitlab.merge_request.source_branch}
                              `
                            }
                        }]
                    },
                    {
                    widgets: [{
                        buttons: [{
                            textButton: {
                                text: `ACESSAR MR`,
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
        }).then(() => {
            res.status(201).json({ msg: 'Alerta de Code Review enviado para o Google Chat'});
        }, (err) => {
            res.status(404).json({ msg: 'Ocorreu algum problema com a requisição par ao Google Chat', erro: err});
        });
    }
})
  
const server = app.listen(PORT, () => {
   const port = server.address().port
   console.log("Listening on port: ", port)
})
