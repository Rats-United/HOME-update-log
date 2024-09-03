import { marked } from 'marked';

const fs = require('fs');

let base = "https://github.com/Rats-United/HOME-update-log";

let tree = `${base}/tree`;
let blob = `${base}/blob`

let basedir = __dirname.replace("workflowscripts", "");
let dir = `${basedir}logs`;
let logrefdir = `${basedir}logref.md`;

let groups = fs.readdirSync(dir);

let content = [];

groups.forEach((group, gi) => {
  let groupdir = `${dir}/${group}`;
  let treelink = `${tree}/${group}`;
  let bloblink = `${blob}/${group}`;
  let logs = fs.readdirSync(groupdir);

  content.push(`### [${group}](${treelink}) (#${gi})`);
  
  logs.forEach((log, li) => {
    bloblink = `${bloblink}/${log}`;
    let logdir = `${groupdir}/${log}`;
    
    let filecontent = fs.readfilesync(logdir);
    // content.push(`${li}. `)

    console.log(filecontent);
  });
});
