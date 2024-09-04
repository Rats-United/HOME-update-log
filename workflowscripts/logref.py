import sys
import os

basedir = os.path.dirname(os.path.realpath(__file__)).replace("workflowscripts", "");
logrefdir = basedir + "logref.md";

print(logrefdir);

commands = [
    'echo os is running',
    'git add {0}'.format(logrefdir),
    'git commit -m "Refreshed logref.md" {0}'.format(logrefdir),
    'git status',
    'git push'
]

for command in commands:
    print(command);
    os.system(command);

sys.stdout.flush()