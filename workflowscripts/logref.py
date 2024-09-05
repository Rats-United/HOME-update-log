import sys
import os

basedir = os.path.dirname(os.path.realpath(__file__)).replace("workflowscripts", "");
logrefdir = basedir + "logref.md";

print(logrefdir);

username = sys.argv[1];
useremail = sys.argv[2];
repolink = sys.argv[3];


print(username, useremail, repolink);


commands = [
    'echo os is running',  
    'git add {0}'.format(logrefdir),
    'git commit -m "Refreshed logref.md" {0}'.format(logrefdir),
    'git push',
    'git status'
];

#if token and token != "undefined":
  #  commands.insert(1, 'git remote set_url origin https://{username}:{token}@${reponame}.git'.format(username=username, token=token, reponame=reponame));

if username != "undefined" and useremail != "undefined":
    commands.insert(1, 'git config --global user.name {0}'.format(username));
    commands.insert(1, 'git config --global user.email {0}'.format(useremail));
    

for command in commands:
    print(command);
    os.system(command);


sys.stdout.flush()
