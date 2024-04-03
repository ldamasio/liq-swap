const axios = require('axios');

const currencyConverterController = async (req, res) => {
    try {
        const { amount, sourceCurrency, targetCurrency } = req.body;

        if (!amount || !sourceCurrency || !targetCurrency) {
            return res.status(400).json({ error: 'Forneça o montante, a moeda de origem e a moeda de destino' });
        }

        const conversionUrl = `https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`;

        const response = await axios.get(conversionUrl);
        const rates = response.data.rates;

        if (!rates || !rates[targetCurrency]) {
            return res.status(400).json({ error: 'Moeda de origem ou destino inválida' });
        }

        const convertedAmount = amount * rates[targetCurrency];
        res.json({ amount: convertedAmount, sourceCurrency, targetCurrency });
    } catch (error) {
        console.error('Erro na conversão de moeda:', error);
        res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
};

const listSymbolsController = async (req, res) => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');

        if (response && response.data && response.data.rates) {
            const currencySymbols = Object.keys(response.data.rates);

            res.status(200).json({ symbols: currencySymbols });
        } else {
            throw new Error('Failed to fetch currency symbols');
        }
    } catch (error) {
        console.error('Error fetching currency symbols:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    currencyConverterController,
    listSymbolsController,
};

