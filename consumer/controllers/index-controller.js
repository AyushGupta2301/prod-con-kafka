const kafkaCommClient = require('../communication/kafkaCommClient');

module.exports = new class{
    async recieve(req,res){
        try{
            const bufferLength = req.body[0].bufferLength;
            const topic = req.body;
            const readData = await kafkaCommClient.readData(topic, bufferLength);
            res.send(JSON.stringify(readData));
        }catch(err){
            console.log(err);
            res.status(500).send("ERROR IN CREATING TOPIC");
        }
    }

    async createConsumer(req,res){
        try{
            const consumerProp = req.body;
            const consumer = kafkaCommClient.createNewConsumer(consumerProp);
            res.send("CONSUMER CREATED");
        }catch(err){
            console.log(err);
            res.status(500).send("ERROR IN CREATING CONSUMER");
        }
    }
}
