import sys
import os

basedir = os.path.dirname(os.path.realpath(__file__)).replace("workflowscripts", "");
logrefdir = basedir + "logref.md";

print(logrefdir);

os.system('git add .', shell=True, stdout=subprocess.PIPE);
# os.system('git commit -m "Updating logref.md" {0}'.format(), shell=True, stdout=subprocess.PIPE);

sys.stdout.flush()
