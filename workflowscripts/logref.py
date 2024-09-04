import sys
import os

basedir = os.path.dirname(os.path.realpath(__file__)).replace("workflowscripts", "");
logrefdir = basedir + "logref.md";

print(logrefdir);

os.system('echo os is running');
os.system('git add all');
os.system('git commit -m "Updating logref.md" {0}'.format(logrefdir));
os.system('git push');

sys.stdout.flush()
