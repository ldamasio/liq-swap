const axios = require('axios');
const { listSymbolsController } = require('../src/controllers/currencyController');

jest.mock('axios');

describe('List Currency Symbols Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of currency symbols', async () => {
    // Mock the axios.get function to return a specific mocked response
    const mockedResponse = {
      data: {
        rates: {
          USD: 1,
          EUR: 0.9,
          GBP: 0.8,
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockedResponse);

    // Create a mock request object
    const req = {};

    // Create a mock response object with a jest.fn() for json
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the listSymbolsController function with the mock request and response
    await listSymbolsController(req, res);

    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Assert that the axios.get function was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    // Assert that the response status is 200 (OK)
    expect(res.status).toHaveBeenCalledWith(200);

    // Assert that the response JSON matches the expected list of currency symbols
    expect(res.json).toHaveBeenCalledWith({
      symbols: ['USD', 'EUR', 'GBP'],
    });
  });

  it('should handle error when fetching currency symbols', async () => {

    // Mock the axios.get function to throw an error
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    // Create a mock request object
    const req = {};

    // Create a mock response object with jest.fn() for status and json
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the listSymbolsController function with the mock request and response
    await listSymbolsController(req, res);

    // Assert that the axios.get function was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    // Assert that the response status is 500 (Internal Server Error)
    expect(res.status).toHaveBeenCalledWith(500);

    // Assert that the response JSON contains the expected error message
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
    });
  });
});

