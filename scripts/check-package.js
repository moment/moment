const fs = require('fs');
const { createRequire } = require('module');
const path = require('path');
const vm = require('vm');

const packageDir = path.resolve(process.argv[2] || '.');
const load = createRequire(path.join(packageDir, 'package.json'));
const moment = load(packageDir);

function runBrowserFile(file, context) {
    vm.runInNewContext(
        fs.readFileSync(path.join(packageDir, file), 'utf8'),
        context,
        { filename: file }
    );
}

load(path.join(packageDir, 'locale/fr'));
if (!moment.version || moment.locale() !== 'fr') {
    throw new Error('CommonJS entry point or locale loading failed');
}

const browser = {};
runBrowserFile('moment.js', browser);
runBrowserFile('locale/fr.js', browser);
if (!browser.moment || browser.moment.locale() !== 'fr') {
    throw new Error('Browser UMD entry point or locale loading failed');
}

const minified = {};
runBrowserFile('min/moment.min.js', minified);
runBrowserFile('min/locales.min.js', minified);
if (!minified.moment || !minified.moment.locales().includes('fr')) {
    throw new Error('Minified core or locales bundle failed');
}

const withLocales = {};
runBrowserFile('min/moment-with-locales.min.js', withLocales);
if (!withLocales.moment || !withLocales.moment.locales().includes('fr')) {
    throw new Error('Minified all-locales bundle failed');
}

const localeMetadata = /^\s*\/\/! locale :/gm;
if (
    (
        fs
            .readFileSync(path.join(packageDir, 'locale/af.js'), 'utf8')
            .match(localeMetadata) || []
    ).length !== 1
) {
    throw new Error('Standalone locale metadata must appear exactly once');
}
for (const file of ['min/locales.js', 'min/moment-with-locales.js']) {
    if (
        localeMetadata.test(
            fs.readFileSync(path.join(packageDir, file), 'utf8')
        )
    ) {
        throw new Error('Aggregate bundle contains duplicated locale metadata');
    }
    localeMetadata.lastIndex = 0;
}

for (const file of [
    'dist/moment.js',
    'dojo.profile.js',
    'ender.js',
    'moment.d.ts',
    'src/moment.js',
    'ts3.1-typings/moment.d.ts',
]) {
    if (!fs.existsSync(path.join(packageDir, file))) {
        throw new Error('Published package is missing ' + file);
    }
}

console.log(packageDir);
