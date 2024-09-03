const fs = require('fs');

let base = "https://github.com/Rats-United/HOME-update-log";

let tree = `${base}/tree/main`;
let blob = `${base}/blob/main`

let basedir = __dirname.replace("workflowscripts", "");
let dir = `${basedir}logs`;
let logrefdir = `${basedir}logref.md`;

let groups = fs.readdirSync(dir);

let content = [];

groups.forEach((group, gi) => {
  let groupdir = `${dir}/${group}`;
  let treelink = `${tree}/${ group.split(" ").join("%20") }`;
  let bloblink = `${blob}/${ group.split(" ").join("%20") }`;
  let logs = fs.readdirSync(groupdir);

  content.push(`### [${group}](${treelink}) (#${gi})`);
  
  logs.forEach((log, li) => {
    bloblink = `${bloblink}/${ log.split(" ").join("%20") }`;
    let logdir = `${groupdir}/${ log }`;
    
    let filecontent = fs.readFileSync(logdir, 'utf8');
    let csplit = filecontent.split(/[\r\n]+/);

    var name;

    csplit.forEach(c => {
      if (c.match(/^# /)) {
        name = c.replace("# ", "").trim();
      }
    });

    if (!name) {
      name = log.replace(".md", "");
    };
    
    content.push(`${li+1}. ${name} [(${ log })](${ bloblink }) `)
  });
});


console.log(content.join("\n\n"));
