import sys
import os

basedir = os.path.dirname(os.path.realpath(__file__)).replace("workflowscripts", "");
logrefdir = basedir + "logref.md";

print(logrefdir);

token = sys.argv[1];
username = sys.argv[2];
reponame = sys.argv[3];

commands = [
    'echo os is running',  
    'git add {0}'.format(logrefdir),
    'git commit -m "Refreshed logref.md" {0}'.format(logrefdir),
    'git push',
    'git status'
];

if token and token != "undefined":
    commands.insert(1, 'git remote add origin https://{1}:{2}@${3}.git'.format(username, token, reponame));

for command in commands:
    print(command);
    os.system(command);

sys.stdout.flush()
