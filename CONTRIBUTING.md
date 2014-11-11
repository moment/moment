Submitting Issues
=================

If you are submitting a bug, please create a [jsfiddle](http://jsfiddle.net/) demonstrating the issue.

Contributing code
=================

To contribute, fork the library and install grunt and dependencies. You need [node](http://nodejs.org/); use [nvm](https://github.com/creationix/nvm) or [nenv](https://github.com/ryuone/nenv) to install it.

```bash
git clone https://github.com/moment/moment.git
cd moment
npm install -g grunt-cli
npm install
git checkout develop  # all patches against develop branch, please!
grunt                 # this runs tests and jshint
```

Very important notes
====================

 * **Pull requests to the `master` branch will be closed.** Please submit all pull requests to the `develop` branch.
 * **Locale translations will not be merged without unit tests.** See [the British English unit tests](https://github.com/moment/moment/blob/develop/test/locale/en-gb.js) for an example.
 * **Do not include the minified files in your pull request.** Don't worry, we'll build them when we cut a release.

Grunt tasks
===========

We use Grunt for managing the build. Here are some useful Grunt tasks:

  * `grunt` The default task lints the code and runs the tests. You should make sure you do this before submitting a PR.
  * `grunt nodeunit:all` Just run the tests.
  * `grunt release` Build everything, including minified files
  * `grunt release --embedLocales=fr,ru` Build everything, and also create `moment-with-customLocales.js` and `moment-with-customLocales.min.js` containing just French and Russian.
  * `grunt size` Print size statistics.
