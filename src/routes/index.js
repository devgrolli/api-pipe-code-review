const controller = require('../controllers/send_chat')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(201).json({ msg: 'Bem vindo ao envio pro Google Chat'});
    })
    
    app.post('/', (req, res) => {
        const nameLabel = 'Aguardando Code Review'
        const response_gitlab = req.body
        const arrayLabels = response_gitlab.merge_request.labels

        if(Array.isArray(arrayLabels) && !arrayLabels.length){
            res.status(200).json({ msg: 'Array de Labels está vazio'});

        }else{
            const validLabel = arrayLabels.find(item => item.title === nameLabel);

            if (validLabel == null){
                return res.status(200).json({ msg: `Não possui a label ${nameLabel} no Merge Request`});
            }
            controller.sendAlertCodeReview(res, response_gitlab)            
        }
    })
}