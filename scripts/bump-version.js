const fs = require('fs');

const version = process.argv[2];

if (!/^\d+\.\d+\.\d+$/.test(version || '')) {
    throw new Error('Usage: npm run bump-version -- 1.2.3');
}

function replace(file, pattern, replacement) {
    const source = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, source.replace(pattern, replacement));
}

function updateJson(file) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    json.version = version;
    if (file === 'package-lock.json' && json.packages && json.packages['']) {
        json.packages[''].version = version;
    }
    fs.writeFileSync(file, JSON.stringify(json, null, 4) + '\n');
}

replace('src/moment.js', /\/\/! version : .*/, '//! version : ' + version);
replace(
    'src/moment.js',
    /moment\.version = '.*'/,
    "moment.version = '" + version + "'"
);

['package.json', 'package-lock.json', 'component.json'].forEach(updateJson);
replace('meteor/package.js', /version: .*/, "version: '" + version + "',");
