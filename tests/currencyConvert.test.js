const axios = require('axios');
const { currencyConverterController } = require('../src/controllers/currencyController');

jest.mock('axios');

describe('Currency Conversion Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return converted amount and currencies', async () => {
    // Mock the axios.get function to return a specific mocked response
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          rates: {
            EUR: 0.9, // Mocked exchange rate for testing
          },
        },
      })
    );

    // Create a mock request object
    const req = {
      body: {
        amount: 100,
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
      },
    };

    // Create a mock response object with a jest.fn() for json
    const res = {
      json: jest.fn(),
    };

    // Call the currencyConverterController function with the mock request and response
    await currencyConverterController(req, res);

    // Assert that the axios.get function was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    // Assert that the response JSON matches the expected converted amount
    expect(res.json).toHaveBeenCalledWith({
      amount: 90, // Expected converted amount based on mocked exchange rate
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
    });
  });

  it('should return error for invalid currency', async () => {
    // Mock the axios.get function to return a specific mocked response
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          rates: {
            EUR: 0.9, // Mocked exchange rate for testing
          },
        },
      })
    );

    // Create a mock request object with an invalid target currency
    const req = {
      body: {
        amount: 100,
        sourceCurrency: 'USD',
        targetCurrency: 'INVALID', // Invalid currency
      },
    };

    // Create a mock response object with jest.fn() for status and json
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the currencyConverterController function with the mock request and response
    await currencyConverterController(req, res);

    // Assert that the axios.get function was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    // Assert that the response status is 400 (Bad Request)
    expect(res.status).toHaveBeenCalledWith(400);

    // Assert that the response JSON contains the expected error message
    expect(res.json).toHaveBeenCalledWith({
      error: 'Moeda de origem ou destino inválida',
    });
  });

  it('should return error for missing parameters', async () => {
    // Create a mock request object with missing parameters
    const req = {
      body: {}, // Missing required parameters
    };

    // Create a mock response object with jest.fn() for status and json
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the currencyConverterController function with the mock request and response
    await currencyConverterController(req, res);

    // Assert that the response status is 400 (Bad Request)
    expect(res.status).toHaveBeenCalledWith(400);

    // Assert that the response JSON contains the expected error message
    expect(res.json).toHaveBeenCalledWith({
      error: 'Forneça o montante, a moeda de origem e a moeda de destino',
    });
  });

  it('should return error for API failure', async () => {
    // Create a mock request object
    const req = {
      body: {
        amount: 100,
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
      },
    };

    // Create a mock response object with jest.fn() for status and json
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock the axios.get function to throw an error
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    // Call the currencyConverterController function with the mock request and response
    await currencyConverterController(req, res);

    // Assert that the axios.get function was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    // Assert that the response status is 500 (Internal Server Error)
    expect(res.status).toHaveBeenCalledWith(500);

    // Assert that the response JSON contains the expected error message
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro Interno do Servidor',
    });
  });

});

