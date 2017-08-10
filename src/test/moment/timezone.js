import { module, test } from '../qunit';
import moment from '../../moment';
import { dstTimeZone } from '../helpers/dst-time-zone';

module('timezones');

test('timezones pass isTimeZone', function (assert) {
    assert.ok(moment.isTimeZone(new moment.timezone.Base()), 'BaseTimeZone');
    assert.ok(moment.isTimeZone(moment.timezone.local), 'local');
    assert.ok(moment.isTimeZone(moment.timezone.fixedOffset(0)), 'fixed-offset(0)');
    assert.ok(moment.isTimeZone(moment.timezone.invalid), 'invalid');
    assert.ok(moment.isTimeZone(moment.timezone.parsed), 'parsed');
    assert.ok(moment.isTimeZone(dstTimeZone(-1, 0, 1)), 'dst-timezone');
});

test('negative test isTimeZone', function (assert) {
    var notTimeZones = [
        null,
        undefined,
        NaN,
        true,
        false,
        0,
        5,
        3.14,
        'TimeZone',
        /TimeZone/,
        ['time', 'zone'],
        {time: 'zone'},
        [],
        {},
        moment(),
        moment.duration(),
        moment().localeData()
    ];
    for (var i in notTimeZones) {
        assert.ok(!moment.isTimeZone(notTimeZones[i]), '' + notTimeZones[i]);
    }
});

test('valid/invalid timezones', function (assert) {
    assert.ok(moment.timezone.local.isValid(), 'local is valid');
    assert.ok(moment.timezone.fixedOffset(60).isValid(), 'fixedOffset is valid');
    assert.ok(!moment.timezone.invalid.isValid(), 'invalid is invalid');
    assert.ok(!moment.timezone.parsed.isValid(), 'parsed is invalid');
});

test('fixed timezone', function (assert) {
    var fixed = moment.timezone.fixedOffset(60);

    assert.equal(fixed.offsetFromTimestamp(+new Date()), 60 * 60 * 1000, 'verify offsetFromTimestamp');
    assert.equal(fixed.offsetFromTimestamp(+moment([2010, 0, 1])), 60 * 60 * 1000, 'verify offsetFromTimestamp');
});
