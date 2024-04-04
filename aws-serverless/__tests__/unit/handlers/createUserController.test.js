const { handler } = require('../../../src/handlers/createUserController');

describe('createUserController', () => {
  test('should create a user', async () => {
    const event = {
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        payload: {
          name: 'John Doe',
        },
      }),
    };

    const response = await handler(event);

    // Assert the response
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();

  });

});