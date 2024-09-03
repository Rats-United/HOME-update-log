const fs = require('fs');

let base = "https://github.com/Rats-United/HOME-update-log";

let tree = `${base}/tree`;
let blob = `${base}/blob`

let dir = `${__dirname}logs`.replace("workflowscripts", "");

let files = fs.readdirSync(dir);

console.log(files);
