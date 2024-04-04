const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        // Extrai os dados recebidos do evento do SQS
        const { Records } = event;
        
        // Configura o cliente do Amazon EventBridge
        const eventBridge = new AWS.EventBridge();
        
        // Para cada registro no evento do SQS
        for (const record of Records) {
            try {
                const { body } = record;
                
                // Parse do corpo da mensagem SQS (se for JSON)
                const eventData = JSON.parse(body);
                
                // Enviar os dados para o EventBridge
                const params = {
                    Entries: [
                        {
                            Source: 'CustomSource',
                            DetailType: 'CustomDetailType',
                            Detail: JSON.stringify(eventData),
                            EventBusName: 'default'
                        }
                    ]
                };
                
                await eventBridge.putEvents(params).promise();
            } catch (error) {
                console.error('Erro ao processar registro do SQS:', error);
            }
        }
        
        return { statusCode: 200, body: 'Dados enviados para o EventBridge com sucesso!' };
    } catch (error) {
        console.error('Erro ao processar evento do SQS:', error);
        return { statusCode: 500, body: 'Erro ao processar evento do SQS' };
    }
};

