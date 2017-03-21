import { module, test } from '../qunit';
import moment from '../../moment';

module('mutable');

test('moment manipulation methods', function (assert) {
    var m = moment([2017, 2, 21, 0, 6, 54]);

    assert.notEqual(m, moment(m), 'constructor should return a new moment');
    assert.notEqual(m, m.year(2011), 'year() should return a new moment');
    assert.notEqual(m, m.month(1), 'month() should return a new moment');
    assert.notEqual(m, m.date(9), 'day() should return a new moment');
    assert.notEqual(m, m.day(3), 'day() should return a new moment');
    assert.notEqual(m, m.hours(7), 'hours() should return a new moment');
    assert.notEqual(m, m.minutes(33), 'minutes() should return a new moment');
    assert.notEqual(m, m.seconds(44), 'seconds() should return a new moment');
    assert.notEqual(m, m.milliseconds(55), 'milliseconds() should return a new moment');
    assert.notEqual(m, m.startOf('week'), 'startOf() should return a new moment');
    assert.notEqual(m, m.endOf('week'), 'endOf() should return a new moment');
    assert.notEqual(m, m.add(1, 'days'), 'add() should return a new moment');
    assert.notEqual(m, m.subtract(2, 'years'), 'subtract() should return a new moment');
    assert.notEqual(m, m.utc(), 'utc() should return a new moment');
    assert.notEqual(m, m.utcOffset(360), 'utcOffset() should return a new moment');

    var utc = m.utc();
    assert.notEqual(utc, utc.local(), 'local() should return a new moment');
});

test('duration manipulation methods', function (assert) {
    var d = moment.duration({months: 2, weeks: 2, days: 0, hours: 5});

    assert.notEqual(d, moment.duration(d), 'constructor should return a new duration');
    assert.notEqual(d, d.abs(), 'abs() should return a new duration');
    assert.notEqual(d, d.add(1, 'days'), 'add() should return a new duration');
    assert.notEqual(d, d.subtract(2, 'years'), 'subtract() should return a new duration');
});

test('moment freeze', function (assert) {
    'use strict';
    var mom = moment([2017, 2, 21, 0, 6, 54]);
    var frozen = Object.freeze(mom);
    assert.equal(mom.valueOf(), frozen.valueOf(), 'Object.freeze should not affect moment#valueOf');
    assert.equal(mom.isValid(), frozen.isValid(), 'Object.freeze should not affect moment#isValid');
    assert.equal(mom.year(), frozen.year(), 'Object.freeze should not affect moment#year getter');
    assert.equal(mom.day(), frozen.day(), 'Object.freeze should not affect moment#day getter');
    assert.equal(+mom.add(1, 'month'), +frozen.add(1, 'month'), 'Object.freeze should not affect moment#add');
    assert.equal(+mom.endOf('month'), +frozen.endOf('month'), 'Object.freeze should not affect moment#endOf');
});

test('duration freeze', function (assert) {
    'use strict';
    var duration = moment.duration({months: 2, weeks: 2, days: 0, hours: 5});
    var frozen = Object.freeze(duration);
    assert.equal(duration.valueOf(), frozen.valueOf(), 'Object.freeze should not affect duration#valueOf');
    assert.equal(duration.isValid(), frozen.isValid(), 'Object.freeze should not affect duration#isValid');
    assert.equal(duration.weeks(), frozen.weeks(), 'Object.freeze should not affect duration#weeks getter');
    assert.equal(+duration.add(1, 'month'), +frozen.add(1, 'month'), 'Object.freeze should not affect duration#add');
    assert.equal(+duration.abs(), +frozen.abs(), 'Object.freeze should not affect duration#abs');
});

test('locale', function (assert) {
    var locale = moment.localeData();
    var afterSet = locale.set('weekdays', ['January','February','March','April','May','June','July']);
    assert.notEqual(locale, afterSet, 'set() should return a new locale');

    var frozenSet = Object.freeze(locale).set('weekdays', ['January','February','March','April','May','June','July']);
    assert.deepEqual(afterSet, frozenSet);
});
