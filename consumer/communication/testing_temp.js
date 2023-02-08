const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
// const newfunc = function () {
//     return new Promise((resolve, reject) => {
//         var data = [];
//         myEmitter.on('event', (msg) => {
//             data.push(msg);
//             console.log("resolving...");
//             resolve(data); // this is dirty read, between resolving and actually reading it, the signature of 'data' can get changed.
//         });
//     });
// };
// (async function () {
//     // const data = await newfunc();
//     // console.log(data);
//     newfunc().then((data)=>{
//         console.log(data);
//     })
// })();
// setInterval(()=>{myEmitter.emit('event', "dd");},1000);

// this will show the dirty read problem
// for (let i = 0; i < 60; i++) {
//     myEmitter.emit('event',"dfdf");
// }

var world = 1;
myEmitter.on('event2',()=>{
    var world_local = world++;
    console.log("new world "+ world_local + " created");
    var cont = 0; //some variable in this 'world's' scope
    myEmitter.on('event',()=>{
        cont++;
        console.log("world "+ world_local + " cont -->" + cont);
    });
});

myEmitter.emit('event2');
myEmitter.emit('event');
myEmitter.emit('event2');
myEmitter.emit('event');


// Output 
// new world 1 created
// world 1 cont -->1
// new world 2 created
// world 1 cont -->2
// world 2 cont -->1
