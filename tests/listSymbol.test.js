const axios = require('axios');
const { listSymbols } = require('../src/controllers/currencyController');

jest.mock('axios');

describe('Currency Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of currency symbols', async () => {
        const mockSymbolResponse = {
            data: {
                success: true,
                symbols: {
                    USD: 'United States Dollar',
                    EUR: 'Euro',
                    GBP: 'British Pound Sterling',
                    JPY: 'Japanese Yen',
                    CAD: 'Canadian Dollar',
                    AUD: 'Australian Dollar',
                    INR: 'Indian Rupee',
                },
            },
        };

        axios.get.mockResolvedValueOnce(mockSymbolResponse);

        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn(),
        };

        await listSymbols(req, res);

        expect(axios.get).toHaveBeenCalledWith('https://api.exchangerate-api.com/v4/symbols');
        expect(res.json).toHaveBeenCalledWith({
            symbols: Object.keys(mockSymbolResponse.data.symbols),
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle API error', async () => {

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        axios.get.mockRejectedValueOnce(new Error('API Error'));

        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await listSymbols(req, res);

        expect(axios.get).toHaveBeenCalledWith('https://api.exchangerate-api.com/v4/symbols');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erro Interno do Servidor' });
    });
});