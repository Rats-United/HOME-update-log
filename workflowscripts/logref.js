const fs = require('fs');

let base = "https://github.com/Rats-United/HOME-update-log";

let tree = `${base}/tree`;
let blob = `${base}/blob`

let dir = `${__dirname}logs`.replace("workflowscripts", "");

let groups = fs.readdirSync(dir);

groups.forEach((v, i) => {
  print(v, i);
});
