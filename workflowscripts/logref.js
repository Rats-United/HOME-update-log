const fs = require('fs');
const fetch = require('node-fetch');
var exec = require('child_process').exec;


const getArgs = () =>
  process.argv.reduce((args, arg) => {
    // long arg
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
    // flags
    else if (arg[0] === "-") {
      const flags = arg.slice(1).split("");
      flags.forEach((flag) => {
        args[flag] = true;
      });
    }
    return args;
  }, {});

const args = getArgs();
const token = args.token;

let base = "https://github.com/Rats-United/HOME-update-log";

let tree = `${base}/tree/main/logs`;
let blob = `${base}/blob/main/logs`

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


content = content.join("\n\n");

fs.writeFileSync(logrefdir, content);

let msg = "Auto-updated logref.md";

exec(`git add .`);
exec(`git commit -m "${msg}" ${logrefdir}`);
