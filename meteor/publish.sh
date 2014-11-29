#!/bin/bash

# Publish package on Meteor's Atmosphere.js

# Make sure Meteor is installed, per https://www.meteor.com/install.
# The curl'ed script is totally safe; takes 2 minutes to read its source and check.
type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }

# sanity check: make sure we're in the root directory of the checkout
cd "$( dirname "$0" )/.."


cleanup() {
  # restore package.js for Dojo
  mv package.dojo package.js

  # temporary build files
  rm -rf ".build.$PACKAGE_NAME" versions.json
}


# publish separately any package*.js files we have, e.g. package.js, package-compat.js
for PACKAGE_FILE in meteor/package*.js; do

  # Meteor expects package.js to be in the root directory of the checkout,
  # but we already have a package.js for Dojo
  mv package.js package.dojo
  cp $PACKAGE_FILE ./package.js

  # publish package, creating it if it's the first time we're publishing
  PACKAGE_NAME=$(grep -i name $PACKAGE_FILE | head -1 | cut -d "'" -f 2)
  ATMOSPHERE_NAME=${PACKAGE_NAME/://}

  echo "Publishing $PACKAGE_NAME..."

  # attempt to re-publish the package - the most common operation
  # once the initial release has been made
  OUTPUT="$( meteor publish 2>&1 )"

  if [ $? -gt 0 ]; then
    # there was an error

    if [[ "$OUTPUT" =~ "There is no package named" ]]; then
      # actually this is the first time the package is created,
      # so pass the special --create flag and congratulate the maintainer
      echo "Thank you for creating the official Meteor package for this library!"
      if meteor publish --create; then
        echo "Please post the following to https://github.com/raix/Meteor-community-discussions/issues/14:

--------------------------------------------- 8< --------------------------------------------------------

Happy to announce that I've published the official $PACKAGE_NAME to Atmosphere. Please star!
https://atmospherejs.com/$ATMOSPHERE_NAME

--------------------------------------------- >8 --------------------------------------------------------

"
      else
        echo "We got an error. Please post it at https://github.com/raix/Meteor-community-discussions/issues/14"
        cleanup
        exit 1
      fi
    else
      # the error wasn't that the package didn't exist, so we need to ask for help
      echo "We got an error. Please post it at https://github.com/raix/Meteor-community-discussions/issues/14:
--------------------------------------------- 8< --------------------------------------------------------
$OUTPUT
--------------------------------------------- >8 --------------------------------------------------------
"
      cleanup
      exit 1
    fi
  else
    # no error on the first `meteor publish` attempt
    echo "$OUTPUT"  # just in case meteor said something interesting
    echo "Thanks for releasing a new version of $PACKAGE_NAME! You can see it at"
    echo "https://atmospherejs.com/$ATMOSPHERE_NAME"
  fi

  cleanup

done
