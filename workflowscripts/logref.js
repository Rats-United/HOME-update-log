const fs = require('fs');
const childproc = require("child_process");
const spawn = childproc.spawn;
const os = require('os');


console.log('test');

let base = "https://github.com/Rats-United/HOME-update-log";

let tree = `${base}/tree/main/logs`;
let blob = `${base}/blob/main/logs`

let basedir = __dirname.replace("workflowscripts", "");
let dir = `${basedir}logs`;
let logrefdir = `${basedir}logref.md`;

let groups = fs.readdirSync(dir);

let content = [

  "# LogRef",
  "this is where log references are for easier navigation",

];

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


content = content.join("\n\n");

fs.writeFileSync(logrefdir, content)


console.log(fs.readFileSync(logrefdir, 'utf8'));

const platform = os.platform();
const pytext = (platform.includes("win")) ? "py" : "python";

const pythonProcess = spawn(pytext, [ `${__dirname}/logref.py` ]);

pythonProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

pythonProcess.stderr.on('data', (data) => {
  console.log(data.toString());
});