const departments = ["A","B","C"];
const empIDs = []

var numemp = 0;
const url = "http://localhost:4000/producer/db/insert"

const routine1 = setInterval(()=>{
    numemp++;
    if( numemp>= 100){
        clearInterval(routine1);
    }
    const department = departments[Math.floor(departments.length * Math.random())];
    var partition;
    if(department === "A"){
        partition = 0;
    }
    if(department === "B"){
        partition = 1;
    }
    if(department === "C"){
        partition = 2;
    }
    const payload = JSON.stringify({employeeID: Math.floor(500 * Math.random()), department: department, topic: "sample_topic1", partition: partition});
    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: payload
    }
    fetch(url,options);
},100);