#! /usr/bin/env node
const cp = require("child_process");

// cp.spawn('node', ["worker.js"])

// cp.exec('node worker.js', function (error, stdout, stderr) {
//   console.log(error, stdout, stderr)
// })

cp.execFile("worker.js", function (error, stdout, stderr) {
  console.log(error, stdout, stderr);
});
