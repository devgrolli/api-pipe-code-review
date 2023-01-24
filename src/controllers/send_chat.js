require('dotenv').config()
const axios = require('axios')
const template = require('../template/google_chat')
const URL_GOOGLE_CHAT = 'https://chat.googleapis.com/v1/spaces/AAAAEelVVHs/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=nMVGivkRRQF__ZzWA-HESQNPMR0iFTB1uuYeQdHZwDM%3D'
// const URL_GOOGLE_CHAT = process.env.URL_GOOGLE_CHAT

exports.sendAlertCodeReview = async (res, response_gitlab) => {
    axios({
        method: 'post',
        url: URL_GOOGLE_CHAT,
        headers: { 'Content-Type': 'application/json'},
        data: template.createTemplateGoogleChat(response_gitlab)
    }).then(() => {
        return res.status(201).json({ msg: 'Alerta de Code Review enviado para o Google Chat'});
    }, (err) => {
        return res.status(404).json({ msg: 'Ocorreu algum problema com a requisição par ao Google Chat', erro: err});
    });
}