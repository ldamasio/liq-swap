const { sqsLambdaHandler } = require('../../../src/handlers/sqsLambdaHandler');
const { PutEventsCommand } = require("@aws-sdk/client-eventbridge");

jest.mock("@aws-sdk/client-eventbridge");

describe('sqsLambdaHandler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send data to EventBridge for each SQS record', async () => {
        const event = {
            Records: [
                {
                    body: '{"key1": "value1"}'
                },
                {
                    body: '{"key2": "value2"}'
                }
            ]
        };

        await sqsLambdaHandler(event);

        // Obter todas as chamadas para PutEventsCommand
        const putEventsCalls = PutEventsCommand.mock.calls;

        // Verificar se foi chamado duas vezes
        expect(putEventsCalls).toHaveLength(2);

        // Verificar a estrutura das chamadas
        expect(putEventsCalls[0][0]).toEqual({
            Entries: [
                {
                    Detail: '{"key1":"value1"}',  // <-- Corrigido aqui
                    DetailType: "CustomDetailType",
                    EventBusName: "default",
                    Source: "CustomSource"
                }
            ]
        });

        expect(putEventsCalls[1][0]).toEqual({
            Entries: [
                {
                    Detail: '{"key2":"value2"}',  // <-- Corrigido aqui
                    DetailType: "CustomDetailType",
                    EventBusName: "default",
                    Source: "CustomSource"
                }
            ]
        });
    });

    it('should handle errors during message processing', async () => {
        const event = {
            Records: [
                {
                    body: '{"key1": "value1"}'
                }
            ]
        };

        // Mocking the EventBridge putEvents to throw an error
        PutEventsCommand.mockImplementation(() => {
            throw new Error('Error processing SQS record');
        });

        const result = await sqsLambdaHandler(event);

        expect(result.statusCode).toBe(500);
        expect(result.body).toBe('Error processing SQS event');
    });
});


