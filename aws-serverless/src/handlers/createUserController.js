exports.handler = async (event) => {
    try {
      // Lógica para processar a requisição de criação de usuário
      const requestBody = JSON.parse(event.body);
      // Por exemplo, você pode salvar os dados em um banco de dados
      const newUser = {
        name: requestBody.name,
        email: requestBody.email,
        // Outros campos, se necessário
      };
  
      return {
        statusCode: 200,
        body: JSON.stringify(newUser),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erro ao criar usuário" }),
      };
    }
  };
  