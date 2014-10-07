#!/bin/bash

set -e

if [ "$#" != 1 ]; then
    echo "Please provide tag to checkout" >&2
    exit 1
fi
tag="$1"

while [ "$PWD" != '/' -a ! -f moment.js ]; do
    cd ..
done

if [ ! -f moment.js ]; then
    echo "Run me from the moment repo" >&2
    exit 1
fi

basename=$(basename $PWD)

cd ..

rm -rf moment-npm

git clone $basename moment-npm

cd moment-npm
git checkout $tag

rm -f **/.??*
rm -rf node_modules
rm -rf bower_components
rm -rf scripts
rm -r benchmarks
rm -r test
rm -r tasks
rm Gruntfile.js
rm CHANGELOG.md
rm CONTRIBUTING.md
rm composer.json
rm component.json
rm bower.json
rm .jscs.json
rm .travis.yml
rm -rf .git

echo "Check out $PWD"
