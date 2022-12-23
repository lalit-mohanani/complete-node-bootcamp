const EventEmitter = require('events');
const http = require('http');
class Sale extends EventEmitter {
    constructor(){
        super();
    }
}

const myEmitter = new Sale();

myEmitter.on('newSale',()=>{
    console.log('There was a new sale!');
});
myEmitter.on('newSale',(stock,name)=>{
    console.log(`Costumer name: ${name}`);
});
myEmitter.on('newSale',(stock)=>{
    console.log(`Stock received: ${stock}`);
});
myEmitter.emit("newSale",9,"Lalit");   

////////////////////////////////////////////////

const server = http.createServer();
server.on("request",(req,res)=>{
    console.log("request received");
    res.end('Request received');    
});

server.on("request",(req,res)=>{
    console.log('Another request received');    
});

server.on("close", () => {
  console.log("Server closed");
});


server.listen(8080,'127.0.0.1',()=> console.log('listening on port 8000'));