import sys
import os

basedir = os.path.dirname(os.path.realpath(__file__)).replace("workflowscripts", "");
logrefdir = basedir + "logref.md";

print(logrefdir);

token = sys.argv[1];

commands = [
    'echo os is running',  
    'git add {0}'.format(logrefdir),
    'git commit -m "Refreshed logref.md" {0}'.format(logrefdir),
    'git push',
    'git status'
];

# if token and token != "undefined":
    # commands.insert(1, 'git remote add origin https://{0}@github.com/Rats-United/HOME-update-log.git'.format(token));

for command in commands:
    print(command);
    os.system(command);

sys.stdout.flush()
