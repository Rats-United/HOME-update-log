const fs = require('fs');

let base = "https://github.com/Rats-United/HOME-update-log";

let tree = `${base}/tree`;
let blob = `${base}/blob`

let dir = `${__dirname}logs`.replace("workflowscripts", "");

let groups = fs.readdirSync(dir);

groups.forEach((group) => {
  let groupdir = `${dir}/${group}`;
  let treelink = `${tree}/${group}`;
  let bloblink = `${blob}/${group}`;
  let logs = fs.readdirSync(groupdir);

  logs.forEach((log) => {
    console.log(log);
  });
});
