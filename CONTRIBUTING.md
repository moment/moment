Submitting Issues
=================

If you are submitting a bug with moment, please create a [jsfiddle](http://jsfiddle.net/) demonstrating the issue.

Contributing
============

To contribute, fork the library and install these npm packages.

    npm install jshint uglify-js nodeunit

You can add tests to the files in `/test/moment` or add a new test file if you are adding a new feature.

To run the tests, do `make test` to run all tests, `make test-moment` to test the core library, and `make test-lang` to test all the languages.

To check the filesize, you can use `make size`.

To minify all the files, use `make moment` to minify moment, `make langs` to minify all the lang files, or just `make` to minfy everything.

If your code passes the unit tests (including the ones you wrote), submit a pull request.

Submitting pull requests
========================

Moment.js now uses [git-flow](https://github.com/nvie/gitflow). If you're not familiar with git-flow, please read up on it, you'll be glad you did.

When submitting new features, please create a new feature branch using `git flow feature start <name>` and submit the pull request to the `develop` branch.

Pull requests for enhancements for features should be submitted to the `develop` branch as well.

When submitting a bugfix, please check if there is an existing bugfix branch. If the latest stable version is `1.5.0`, the bugfix branch would be `hotfix/1.5.1`. All pull requests for bug fixes should be on a `hotfix` branch, unless the bug fix depends on a new feature.

The `master` branch should always have the latest stable version. When bugfix or minor releases are needed, the develop/hotfix branch will be merged into master and released.
