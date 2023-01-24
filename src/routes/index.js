const controller = require('../controllers/send_chat')

const formatDate = (str) => {
    const date = new Date(str);
    const yyyy = date.getFullYear().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getUTCDate().toString().padStart(2, '0');
    return `${dd}/${mm}/${yyyy}`;
}

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(201).json({ msg: 'Bem vindo ao envio pro Google Chat'});
    })
    
    app.post('/', (req, res) => {
        const nameLabel = 'Code Review'
        const response_gitlab = req.body
        const arrayLabels = response_gitlab.merge_request.labels
        const dateCurrent = formatDate((new Date).toString())

        if(Array.isArray(arrayLabels) && !arrayLabels.length){
            res.status(200).json({ msg: 'Array de Labels está vazio'});

        }else{
            const validLabel = arrayLabels.find(item => item.title === nameLabel && formatDate(item.created_at) === dateCurrent);

            if (validLabel == null){
                return res.status(200).json({ msg: `Não possui a label ${nameLabel} no Merge Request`});
            }
            controller.sendAlertCodeReview(res, response_gitlab)            
        }
    })
}