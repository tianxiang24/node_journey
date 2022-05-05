const http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hello  World\n");
  })
  .listen((Math.ceil((Math.random() + 1) * 1000)), "127.0.0.1");
