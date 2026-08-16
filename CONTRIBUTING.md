Submitting Issues
=================

If you are submitting a bug, please create a [jsfiddle](http://jsfiddle.net/) demonstrating the issue.
Note: Before raising a new issue, please do check the existing issues and make sure your issue doesn’t exist.

Read before submitting Pull Requests
====================================

- **Pull requests to the `master` branch will be closed.** Please submit all pull requests to the `develop` branch.
- **You will be required to sign a JS Foundation CLA before your pull request can be merged.** [Sign it right now](https://cla.js.foundation/moment/moment).
- **Locale translations will not be merged without unit tests.** See [the British English unit tests](https://github.com/moment/moment/blob/develop/test/locale/en-gb.test.js) for an example.
- **Do not include the minified files in your pull request.** These are
  `moment.js`, `locale/*.js`, `min/*.js`. Don't worry, we'll build them when
  we cut a release.

Code organization
=================

Starting from version 2.10.0 the code is placed under `src/`.
`moment.js`, `locale/*.js`, `min/*.js` are generated only on release.

**DO NOT** submit changes to the generated files. Instead, change the source
and test files and run the tests.

- `src/lib/**/*.js` moment core files
- `src/locale/*.js` locale files
- `test/moment/*.test.js` moment core tests
- `test/locale/*.test.js` locale tests

We're using ES6 module system, but nothing else ES6, because of performance
considerations (added code by the transpiler, less than optimal translation to
ES5). So please do not use that fancy new ES6 feature in your patch, it won't
be accepted.

Setting up development environment
==================================

To contribute, fork the library and install the dependencies. You need
[git](http://git-scm.com/) and
[node](http://nodejs.org/); you might use
[nvm](https://github.com/creationix/nvm) or
[nenv](https://github.com/ryuone/nenv) to install node.

```bash
git clone https://github.com/moment/moment.git
cd moment
npm install --global pnpm@11.22.0
pnpm install
git checkout develop  # all patches against develop branch, please!
pnpm run validate         # this runs tests and lint checks
pnpm run typescript-test  # this runs TypeScript declaration tests
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

Development scripts
===================

The build and development commands are exposed as package scripts:

- `pnpm run validate` Lint the code and run the tests. You should make sure you do this before submitting a PR.
- `pnpm test` Run the tests.
- `pnpm run typescript-test` Run the TypeScript declaration tests.
- `pnpm run lint` Perform syntax and code style checks.
- `pnpm run package:dry-run` Preview the files included in the npm package.
- `pnpm run check-package path/to/moment` Test an installed package's runtime artifacts.
- `pnpm run release` Build everything, including minified files (do not include
  those in Pull Requests)
- `pnpm run build:custom fr,ru` Build custom locale bundles `moment-with-locales.custom.js` and `locales.custom.js` inside `build/umd/min` containing just French and Russian.
- `pnpm run benchmark compare` Run a benchmark, or omit the name to run all benchmarks.

**Note:** If the prompt message is `Code style issues found in the above file(s). Forgot to run Prettier?`, Please run `pnpm run prettier-fmt`.
