#!/bin/bash

export REPOSITORY_URL=`git config --get remote.origin.url`
cd build
git config user.email "mugen.xyz@gmail.com"
git config user.name "sunya9 from Travis-CI"
git init
git remote add origin $REPOSITORY_URL
git add .
git commit -m 'Update'
git push --force --quiet "https://${GH_TOKEN}@github.com/sunya9/unsweets.net.git" master:gh-pages > /dev/null 2>&1