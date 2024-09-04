import sys
import os

dir_path = os.path.dirname(os.path.realpath(__file__));

print(dir_path);

#os.system('git add .', shell=True, stdout=subprocess.PIPE);
# os.system('git commit -m "Updating logref.md" {0}'.format(), shell=True, stdout=subprocess.PIPE);

sys.stdout.flush()
