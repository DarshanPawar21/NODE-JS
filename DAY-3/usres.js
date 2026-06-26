import http from "http"
const usres = http.createServer((req, res) => {
    if (req.url == "/use" && req.method == "GET") {
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
    }
    else {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(
            {
                status: false,
                message: "Home Page !"
            }
        ))
    }
})

export default users;