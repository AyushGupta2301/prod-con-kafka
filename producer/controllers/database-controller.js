const cosmosDataAccess = require('../data-access/cosmosDAO');
const kafkaCommClient = require('../communication/kafkaCommClient');

module.exports = new class{
    async create_req(req,res){
        const newEmployee = {empID: req.body.employeeID, action:"INSERT"};
        const insertStatus = await cosmosDataAccess.insert(req.body);
        const KafkaPayloads = [{topic: req.body.topic, partition: Number(req.body.partition), messages: JSON.stringify(newEmployee)}];
        if(insertStatus === "SUCCESS"){
            res.send("Data Inserted");
            const commStatus = await kafkaCommClient.sendData(KafkaPayloads);
        }
    }

    async delete_all(req,res){
        try{
            const department = req.params.rid;
            const deleteStatus = await cosmosDataAccess.flush(department);
            res.send("DELETED");
        }catch(err){
            console.log(err);
            res.send("ERRORRR");
        }
    }
}