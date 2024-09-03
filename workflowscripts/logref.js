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
    
    let filecontent = fs.readFileSync(logdir, 'utf8');
    let csplit = filecontent.split(/[\r\n]+/);

    var name;

    csplit.forEach(c => {
      if (c.includes("# ")) {
        name = c.replace("# ", "").trim();
      }
    });

    if (!name) {
      name = log.replace(".md", "");
    };
    
    content.push(`${li}. ${name} [(${log})](${bloblink}) `)

    console.log(content.join("\n\n"));
  });
});
