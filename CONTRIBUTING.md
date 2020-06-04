Submitting Issues
=================

If you are submitting a bug, please create a [jsfiddle](http://jsfiddle.net/) demonstrating the issue.

Read before submitting Pull Requests
====================================

 * **Pull requests to the `master` branch will be closed.** Please submit all pull requests to the `develop` branch.
 * **You will be required to sign a JS Foundation CLA before your pull request can be merged.** [Sign it right now](https://cla.js.foundation/moment/moment).
 * **Locale translations will not be merged without unit tests.** See [the British English unit tests](https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js) for an example.
 * **Do not include the minified files in your pull request.** These are
   `moment.js`, `locale/*.js`, `min/*.js`. Don't worry, we'll build them when
   we cut a release.

Code organization
=================

Starting from version 2.10.0 the code is placed under `src/`.
`moment.js`, `locale/*.js`, `min/*.js` are generated only on release.

**DO NOT** submit changes to the generated files. Instead only change
`src/**/*.js` and run the tests.

* `src/lib/**/*.js` moment core files
* `src/locale/*.js` locale files
* `src/test/moment/*.js` moment core tests
* `src/test/locale/*.js` locale tests

We're using ES6 module system, but nothing else ES6, because of performance
considerations (added code by the transpiler, less than optimal translation to
ES5). So please do not use that fancy new ES6 feature in your patch, it won't
be accepted.

Setting up development environment
==================================

To contribute, fork the library and install grunt and dependencies. You need
[git](http://git-scm.com/) and
[node](http://nodejs.org/); you might use
[nvm](https://github.com/creationix/nvm) or
[nenv](https://github.com/ryuone/nenv) to install node.

```bash
git clone https://github.com/moment/moment.git
cd moment
npm install -g grunt-cli
npm install
git checkout develop  # all patches against develop branch, please!
grunt                 # this runs tests, eslint and prettier-check
```

Changing locale files
=====================

If you have any changes to existing locale files, `@mention` the original
author in the pull request (check the top of the language file), and ask if
he/she approves of your changes. Because I don't know any languages I can't
judge your locale changes, only the original author can :)

In order for your pull request to get merged it must have approval of original
author, or at least one other native speaker has to approve of the change
(happens rarely).

Grunt tasks
===========

We use Grunt for managing the build. Here are some useful Grunt tasks:

  * `grunt` The default task lints the code and runs the tests. You should make sure you do this before submitting a PR.
  * `grunt test` Run the tests.
  * `grunt lint` Perform syntax and code style checks.
  * `grunt release` Build everything, including minified files (do not include
    those in Pull Requests)
  * `grunt transpile:fr,ru` Build custom locale bundles `moment-with-locales.custom.js` and `locales.custom.js` inside `build/umd/min` containing just French and Russian.
  * `grunt size` Print size statistics.

**Note:** If the prompt message is `Code style issues found in the above file(s). Forgot to run Prettier?`, Please run `npm run prettier-fmt`. 

Becoming a moment team member
=============================

Moment's team members have extra powers and responsibilities. If you want to
become one -- be active in our repositories by answering issues, reviewing PRs,
discussing changes, submitting PRs for open bugs. Any help on
[moment/moment](https://github.com/moment/moment),
[moment/momentjs.com](https://github.com/moment/momentjs.com),
[moment/moment-timezone](https://github.com/moment/moment-timezone) will be
noticed.

Once you've proven to be trustworthy, submit your request to the
[gitter chat](https://gitter.im/moment/moment), and it will be reviewed by the
existing team.

Once you become a member:
* you can tell your friends
* you can close issues submitted by others

But also:
* be active in the repositories
* pick up work nobody else wants to
* attend a monthly meeting
* participate in the internal slack group
