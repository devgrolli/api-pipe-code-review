exports.createTemplateGoogleChat = (response_gitlab) => {
    const body = {
        cards: [{
            header: {
                title: `Aberto Code Review - ${response_gitlab.repository.name}`,
                subtitle: 'Acompanhe o code review ',
                imageUrl: 'https://cdn0.iconfinder.com/data/icons/designer-skills/128/node-js-512.png',
                imageStyle: 'AVATAR'
            },
            sections: [
                {
                    widgets: [{
                        textParagraph: {
                            text: 
                            `<b>Usuário: <font color=\"#66CDAA\"> ${response_gitlab.user.name}</font></b>

                            <b>Branch</b>: ${response_gitlab.merge_request.source_branch}`
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
    return body;
}