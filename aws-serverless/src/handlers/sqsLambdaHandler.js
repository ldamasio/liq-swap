const { PutEventsCommand } = require("@aws-sdk/client-eventbridge");

async function sqsLambdaHandler(event) {
    let processedEvents = 0;
    let failedEvents = 0;

    try {
        for (const record of event.Records) {
            const { body } = record;

            // Process the SQS record
            const parsedBody = JSON.parse(body);

            // Simulate sending to EventBridge
            await PutEventsCommand({
                Entries: [
                    {
                        Detail: JSON.stringify(parsedBody),
                        DetailType: "CustomDetailType",
                        EventBusName: "default",
                        Source: "CustomSource"
                    }
                ]
            });

            processedEvents++;
        }

        return {
            statusCode: 200,
            body: `Processed ${processedEvents} events, failed ${failedEvents} events.`
        };
    } catch (error) {
        console.error('Error processing SQS record:', error);
        return {
            statusCode: 500,
            body: 'Error processing SQS event'
        };
    }
}

module.exports = { sqsLambdaHandler };
