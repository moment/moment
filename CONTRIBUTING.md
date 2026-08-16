# Contributing to Moment.js

## Submitting Issues

If you are submitting a bug, please create a
[jsfiddle](http://jsfiddle.net/) demonstrating the issue. Before raising a new
issue, check the existing issues and make sure your issue does not already
exist.

## Read Before Submitting Pull Requests

- **Pull requests to the `master` branch will be closed.** Please submit all
  pull requests to the `develop` branch.
- **You will be required to sign a JS Foundation CLA before your pull request
  can be merged.** [Sign it right now](https://cla.js.foundation/moment/moment).
- **Locale translations will not be merged without unit tests.** See
  [the British English unit tests](https://github.com/moment/moment/blob/develop/test/locale/en-gb.test.js)
  for an example.
- **Do not include the minified files in your pull request.** These are
  `moment.js`, `locale/*.js`, `min/*.js`. Don't worry, we'll build them when
  we cut a release.

## Code Organization

Starting from version 2.10.0 the code is placed under `src/`.
`moment.js`, `locale/*.js`, `min/*.js` are generated only on release.

**DO NOT** submit changes to the generated files. Instead, change the source
and test files and run the tests.

- `src/lib/**/*.js` moment core files
- `src/locale/*.js` locale files
- `test/moment/*.test.js` moment core tests
- `test/locale/*.test.js` locale tests

Source files use ES modules, which the build bundles but does not otherwise
transpile for legacy runtimes. Follow the compatibility-oriented style of the
surrounding code, and do not introduce newer JavaScript syntax or built-ins
without confirming that the supported runtimes can execute them.

## Setting Up the Development Environment

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
pnpm validate         # this runs tests and lint checks
pnpm test:typescript  # this runs TypeScript declaration tests
```

## Changing Locale Files

Locale changes are reviewed first against the latest published Unicode CLDR
data, which is the project's preferred baseline. A change that differs from
CLDR may still be accepted when strong evidence shows that CLDR is stale,
inaccurate, or does not reflect the locale's documented convention.

Please describe the convention behind the change and include supporting sources
when available. Useful references include government or institutional style
guides, national standards, language-academy dictionaries, official calendars,
and other evidence of contemporary usage. Sources are requested but not
required; maintainers will independently validate the proposed behavior.
Maintainers are not necessarily native speakers, so AI-assisted research and
review should be expected. AI output is not treated as evidence; review
conclusions remain grounded in CLDR and authoritative external sources.

Make locale changes in `src/locale/<locale>.js` and add or update the matching
`test/locale/<locale>.test.js` for each distinct form affected. Do not edit the
generated copies under `locale/`, `dist/`, or `min/`; those are regenerated for
releases.

## Development Scripts

Common build and development commands are exposed as package scripts:

- `pnpm validate` Lint the code and run the tests. You should make sure you do
  this before submitting a PR.
- `pnpm test` Run the tests.
- `pnpm test:watch` Run tests in watch mode.
- `pnpm test:coverage` Run tests and generate a coverage report.
- `pnpm test:typescript` Run the TypeScript declaration tests.
- `pnpm lint` Perform syntax and code style checks.
- `pnpm format` Format supported files with Prettier.
- `pnpm build` Build the development artifacts in `build/`.
- `pnpm build:custom fr,ru` Build custom locale bundles
  `moment-with-locales.custom.js` and `locales.custom.js` inside `build/umd/min`
  containing just French and Russian.
- `pnpm benchmark compare` Run a benchmark, or omit the name to run all
  benchmarks.
- `pnpm locale:authors list` List locale authors; `mention` formats mentions and
  `find-commenters ISSUE` lists issue participants.

Commands for release preparation and publication are documented in
[RELEASING.md](RELEASING.md).
