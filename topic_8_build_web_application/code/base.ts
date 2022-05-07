import * as http from "http";
import { readFile } from "fs";

http
  .createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html");
    readFile(__dirname + "/template.html", "utf-8", (err, data) => {
      if(err) {
        console.log(err)
        return;
      }
      res.end(data);
    });
  })
  .listen(3000);

/**
 * curl 'http://127.0.0.1:3000/' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"' \
  -H 'Referer: ' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  --data-raw '{a: 11}' \
  --compressed
*/
