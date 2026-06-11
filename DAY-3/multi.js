import http from "http";
// import { time } from "console";
    import http from "http";
    const multi = http.createServer((req, res) => {
        if (req.url == "/" && req.method == "GET") {
            res.writeHead(200, { "content-type": "aplication/json" });
            res.end(JSON.stringify(
                {
                    status: true,
                    current: Date.now();
                }
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
    multi.listen(3003,()=>{
        console.log("server is stard !")
    })