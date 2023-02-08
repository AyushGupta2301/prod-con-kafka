const kafkaCommClient = require('../communication/kafkaCommClient');
const ws = require('websocket');
const kafka = require('kafka-node');
const client = new kafka.KafkaClient('localhost:2181');
// const topic = [{topic: "sample_topic2",partition: 0}];
// const consumer = new kafka.Consumer(client,topic);

module.exports = new class{
    init(httpServer){
        this.wsServer = new ws.server({
            httpServer: httpServer,
            autoAcceptConnections: false
        });
        kafkaCommClient.enableDataStream(this.wsServer,kafka); 
    }    
}