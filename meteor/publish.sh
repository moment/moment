# Publish package on Meteor's Atmosphere.js

# Make sure Meteor is installed, per https://www.meteor.com/install
type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }

# sanity check: make sure we're in the root directory of the checkout
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd DIR/..

# move away the package.js for Dojo
mv package.js package.dojo
cp meteor/package.js ./

# publish and restore the Dojo package.js
meteor publish
mv package.dojo package.js
