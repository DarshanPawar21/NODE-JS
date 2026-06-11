import http from "http"
const server = http.createServer((req, res) => {
    if (req.url == "/" && req.method == "GET") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(
            {
                status: true,
                message: "Home Page !"
            }
        ))
    }
    else if (req.url == "/users" && req.method == "GET") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(
            {
                status: true,
                message: "Users Page !"
            }
        ))
    }else if(req.url == "/api/users" && req.method == "POST"){
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(
            {
                status: true,
                message: "POST Page !"
            }
        ))
    }
    else if(req.url == "/api/users" && req.method == "DELETE"){
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(
            { }
        ))
    }
    else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end(JSON.stringify(
            {
                status: false,
                message: "Page not found Page !"
            }
        ))
    }
})

server.listen(3000,()=>{
    console.log("server is started !")
})