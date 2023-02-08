// const kafka = require('kafka-node');

module.exports = {
    readData: function (topic, bufferLength) {
        const client = new kafka.KafkaClient('localhost:2181');
        const consumer = new kafka.Consumer(client, topic);
        return new Promise((resolve, reject) => {
            var data = []
            var i = 0;
            consumer.on('message', (msg) => {
                data.push(msg.value);
                if (data.length >= bufferLength) {
                    resolve(data); // this is dirty read, between resolving and actually reading it, the signature of 'data' can get changed.
                    consumer.removeAllListeners('message'); // that's why this is required so that no more things can be added to the 'data'
                    consumer.close(() => {
                        console.log("Consumer is closing...");
                    });
                }
            });
        });
    },

    createNewConsumer: function (topic) {
        const client = new kafka.KafkaClient('localhost:2181');
        const consumer = new kafka.Consumer(client, topic);
        return consumer;
    },

    closeConsumer: function (consumer) {
        consumer.close(() => {
            console.log("Consumer is closing...");
        });
    },

    enableDataStream: function (wsServer, kafka) {
        wsServer.on('request', (req) => {
            console.log('new websocket Connection request');
            const conn = req.accept('echo-protocol', req.origin);
            var consumers = [];
            conn.on('message', (msg) => {
                const messg = JSON.parse(msg.utf8Data);
                const subid = Number(messg.subid);
                try {
                    if (messg.type === "subscribe") {
                        delete messg.type;
                        const topic = [{ ...messg }];
                        topic[0].partition = Number(topic[0].partition);
                        const client = new kafka.KafkaClient('localhost:2181');
                        const consumer = new kafka.Consumer(client, topic);
                        consumers[subid] = consumer;
                        consumer.on('message', (msg) => {
                            conn.sendUTF(JSON.stringify({type:"message", subid: subid, message: msg.value}));
                        });
                    }
                    else if (messg.type === "close") {
                        if (consumers[subid]) {
                            console.log(`closing consumer with subid ${subid}`);
                            consumers[subid].removeAllListeners('message');
                            consumers[subid].close();
                        }
                    }
                    else {
                        throw new Error("SOME ERROR");
                    }
                } catch (err) {
                    console.log(err);
                    conn.sendUTF(JSON.stringify({ type: "error", message: "missing fields or not recognized message type" }));
                }
            });
            conn.on('close',()=>{
                consumers.forEach(consumer => {
                    console.log("Closing consumer");
                    consumer.close();
                });
                console.log("All active consumers closed");
            });
        });
    }
}