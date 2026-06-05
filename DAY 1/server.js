import http from 'http';

const server = http.createServer((req,res)=>{ // create server
    res.writeHead(200,{"content-type":"text/plain"}); // set header for data response 
    res.end("Node Server Run Successfully !");
});

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})