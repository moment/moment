'use strict';

var assert = require('assert');
var path = require('path');
var packageDir = path.resolve(process.argv[2] || 'build/umd');
var moment = require(path.join(packageDir, 'moment.js'));

assert.strictEqual(typeof moment, 'function');
assert.strictEqual(typeof moment.version, 'string');
assert.strictEqual(
    moment.utc('2016-01-02T03:04:05Z').format(),
    '2016-01-02T03:04:05Z'
);
assert.strictEqual(
    moment.utc([2016, 0, 2]).add(2, 'days').format('YYYY-MM-DD'),
    '2016-01-04'
);
assert.strictEqual(moment.duration({ days: 2, hours: 3 }).asHours(), 51);
assert.strictEqual(moment('2016-02-30', 'YYYY-MM-DD', true).isValid(), false);
assert.strictEqual(
    moment.parseZone('2016-01-02T03:04:05-06:00').utcOffset(),
    -360
);

require(path.join(packageDir, 'locale', 'fr.js'));
assert.strictEqual(moment.locale(), 'fr');
assert.strictEqual(
    moment.utc([2016, 0, 2]).format('D MMMM YYYY'),
    '2 janvier 2016'
);

var withLocales = require(
    path.join(packageDir, 'min', 'moment-with-locales.js')
);
assert.notStrictEqual(withLocales.locales().indexOf('fr'), -1);

console.log('Runtime compatibility passed on ' + process.version);
