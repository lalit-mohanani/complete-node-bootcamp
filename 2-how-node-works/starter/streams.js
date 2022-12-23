const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //1
    // fs.readFile('test-file.txt', 'utf8', (err,data) => {
    //     if(err) console.log(err);
    //     const time = Date.now();
    //     res.end(data);
    // })
    
    //2 streams
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data',chunk => {
        //     res.write(chunk);
        //     // console.log(Date.now() - time);
        // })
        // readable.on('end',()=>res.end());
        // readable.on('error',(err)=>{  
            //     console.log(err)
            //     res.statusCode=500;
            //     res.end("Fiel not fouund;");
            // });
            
            //3 
            // const time = Date.now();
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
        // console.log(Date.now() - time);
});

server.listen(8080,'localhost', (err, res) => {
    console.log('listening...');
});