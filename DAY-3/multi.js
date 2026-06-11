    const date = new Date();
import { time } from "console";
    import http from "http";
    const multi = http.createServer((req, res) => {
        if (req.url == "/" && req.method == "GET") {
            res.writeHead(200, { "content-type": "aplication/json" });
            res.end(JSON.stringify(
                {
                    status: true
                    time: date.now()      
                }
            ))
        }
    })