const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');

// // Specify the AWS profile you configured with the CLI
// const credentials = new AWS.SharedIniFileCredentials({ profile: 'local' });
// AWS.config.credentials = credentials;

// Specify the AWS region you are using
AWS.config.update({ region: 'us-east-1' });

// const docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    try {
        console.log('Received event:', JSON.stringify(event, null, 2));

        // Parse do corpo da requisição
        const requestBody = JSON.parse(event.body);
        console.log('Request body:', JSON.stringify(requestBody, null, 2));
        
        // Gere um timestamp Unix para o ID
        const timestamp = Date.now();
        
        // Gerar um hash seguro para a senha usando bcrypt
        const hashedPassword = await bcrypt.hash(requestBody.password, 10); // 10 é o custo de processamento

        const newUser = {
            userId: `user_${timestamp}`, // Prefixo 'user_' com timestamp
            email: requestBody.email,
            password: hashedPassword, // Armazenar o hash da senha
            payload: requestBody.payload, // Adicionando o campo payload
        };

        // Parâmetros para adicionar um novo item na tabela DynamoDB
        const params = {
            TableName: 'UserTable', // Nome da tabela DynamoDB
            Item: newUser,
        };

        console.log('Colocando item no DynamoDB:', JSON.stringify(params, null, 2));

        // Inserir o novo usuário na tabela DynamoDB
        // await docClient.put(params).promise();

        console.log('Novo usuário criado:', JSON.stringify(newUser, null, 2));

        // Não inclua a senha no retorno da resposta
        delete newUser.password;

        return {
            statusCode: 200,
            body: JSON.stringify(newUser),
        };
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao criar usuário" }),
        };
    }
};

