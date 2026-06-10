import http from "http"
const server = http.createServer((req, res) => {
        // res.writeHead(200, { "content-type": "text/plain" });
        if (req.url == "/") {
            res.writeHead(200, { "content-type": "text/plain" });
            res.end("welcome to home page !")
        } else if (req.url == "/students") {
            res.writeHead(200, { "content-type": "text/plain" });
            res.end("this is student page");
        }
        else {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end("page not found !")
    }
});

server.listen(3000, () => {
    console.log("Server is started !")
})