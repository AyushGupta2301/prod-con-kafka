const kafka = require('kafka-node');

module.exports = {
    sendData: async function (payloads) {
        const client = new kafka.KafkaClient('localhost:2181');
        const producer = new kafka.Producer(client); // 'new' CLIENT AND PRODUCER BOTH NEED TO BE TOGETHER TO EMIT 'READY'
        return new Promise((resolve, reject) => {
            producer.on('ready', () => {
                producer.send(payloads, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            });
        });
    },
    createTopic: async function (topic) {
        const client = new kafka.KafkaClient('localhost:2181');
        const topicToCreate = topic;
        return new Promise((resolve, reject) => {
            client.createTopics(topicToCreate, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}