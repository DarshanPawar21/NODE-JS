import http from "http";
import { json } from "stream/consumers";

const api = http.createServer((req, res) => {
    if (req.url == "/" && req.method == "PUT") {
        res.writeHead(200, { "content-type": "aplication/json" });
        res.end(JSON.stringify(
            {
                status: false
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
api.listen(3001, () => {
    console.log("Server is stard in locahost:3001")
})