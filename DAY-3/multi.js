// import http from "http";
// import { time } from "console";
import http from "http";
import fs from "fs"
import path from "path"

if (!fs.existsSync("log.txt")) {
    fs.writeFileSync("DAY-3/log.txt", "");
}

const server = http.createServer((req, res) => {
    const date = new Date();
    const log = "The server enter on" + req.url + "it on time " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    fs.appendFileSync("DAY-3/log.txt","\n"+log);
    res.writeHead(200, { "content-type": "aplication/json" });
        res.end(JSON.stringify(
            {
                status: true
            }
        ))
    }
)

server.listen(5000,()=>{
    console.log("Server is stard !");
})