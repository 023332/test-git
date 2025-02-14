import  {createServer} from "http";
import fs from "fs";
import path from "path";

const mimeTypes  = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
}

function fileMiddleware(req, res, next) {
    let url = req.url;
    if(url === "/" ){
        url = '/home.html';
    }

    const filePat = path.resolve("test"+url);
    fs.promises.access(filePat)
        .then(()=>{
            path.extname(filePat);
            res.writeHead(200, {"Content-Type": mimeTypes[next]});
            fs.createReadStream(filePat).pipe(res);
        })
        .catch(() =>{
            next();
        })
}

const server = createServer((req, res) =>{

    fileMiddleware(req, res, () =>{
        if (req.url === "/hello"){
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("Hello World!");
        }else if(req.url === "/bye"){
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                email: "nahapetyankaren422@gmail.com",
                possword: "nahapetyan144"

            }))
        }else {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("404 Not Found!");
        }
    });
});

server.listen(3001);
console.log("Server started on port 3000");