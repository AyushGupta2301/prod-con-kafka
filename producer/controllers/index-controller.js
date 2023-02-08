const kafkaCommClient = require('../communication/kafkaCommClient');

module.exports = new class{
    async create(req,res){
        try{
            const topic = req.body;
            const createStatus = await kafkaCommClient.createTopic(topic);
            res.send("Topic created");
        }catch(err){
            console.log(err);
            res.status(500).send("ERROR IN CREATING TOPIC");
        }
    }

    async send(req,res){
        try{
            const payloads = req.body;
            const sendStatus = await kafkaCommClient.sendData(payloads);
            res.send("Data Sent");
        }catch(err){
            console.log(err);
            res.status(500).send("ERROR IN SENDING DATA");
        }
    }
}