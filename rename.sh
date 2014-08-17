#!/bin/bash
# rename.sh
# MIT License (c) 2014
# codenameyau.github.io
#
# Description:
# Run this script to rename your application
#
# Example:
# chmod 700 rename.sh
# ./rename.sh StarterApp StarterApp

if [ $1 ] && [ $2 ]; then
  # Rename files in src
  find . -name $1'*' | sed -e 'p;s/'$1'/'$2'/' | xargs -n2 mv

  # Replace first name with second name
  grep -rl $1 ./ | xargs sed -i 's/'$1'/'$2'/g'

else
  echo 'No arguments supplied: <appname> <replace>'
fi
