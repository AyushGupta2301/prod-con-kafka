const { CosmosClient } = require('@azure/cosmos');
const endpoint = "https://localhost:8081";
const primaryKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
const client = new CosmosClient({endpoint: endpoint,key: primaryKey});
var db;
var containers = [];

(async ()=>{
    db  = (await client.databases.createIfNotExists({id: "Employees"})).database;
    var container = (await db.containers.createIfNotExists({id: "Department A"})).container;
    containers.push(container);
    container = (await db.containers.createIfNotExists({id: "Department B"})).container;
    containers.push(container);
    container = (await db.containers.createIfNotExists({id: "Department C"})).container;
    containers.push(container);
})();

module.exports = new class{
    async insert(data){
        var department = data.department;
        var container;
        if(department === "A"){
            container = containers[0];
        }
        if(department === "B"){
            container = containers[1];
        }
        if(department === "C"){
            container = containers[2];
        }
        const insertStatus = await container.items.create(data);
        // console.log(insertStatus);
        return "SUCCESS";
    }

    async flush(department){
        var container;
        if(department === "A"){
            container = containers[0];
        }
        if(department === "B"){
            container = containers[1];
        }
        if(department === "C"){
            container = containers[2];
        }
        const items = await container.items.query("SELECT * FROM c").delete();
    }
}