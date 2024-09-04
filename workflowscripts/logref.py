import sys
import os

basedir = os.path.dirname(os.path.realpath(__file__)).replace("workflowscripts", "");
logrefdir = basedir + "logref.md";

print(logrefdir);

os.system('git add .', shell=True);
# os.system('git commit -m "Updating logref.md" {0}'.format(), shell=True);

sys.stdout.flush()
