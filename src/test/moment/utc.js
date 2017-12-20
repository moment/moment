import { module, test } from '../qunit';
import moment from '../../moment';

module('utc');

test('utc and local', function (assert) {
    var m = moment(Date.UTC(2011, 1, 2, 3, 4, 5, 6)), offset, expected;
    m.utc();
    // utc
    assert.equal(m.date(), 2, 'the day should be correct for utc');
    assert.equal(m.day(), 3, 'the date should be correct for utc');
    assert.equal(m.hours(), 3, 'the hours should be correct for utc');

    // local
    m.local();
    if (m.utcOffset() < -180) {
        assert.equal(m.date(), 1, 'the date should be correct for local');
        assert.equal(m.day(), 2, 'the day should be correct for local');
    } else {
        assert.equal(m.date(), 2, 'the date should be correct for local');
        assert.equal(m.day(), 3, 'the day should be correct for local');
    }
    offset = Math.floor(m.utcOffset() / 60);
    expected = (24 + 3 + offset) % 24;
    assert.equal(m.hours(), expected, 'the hours (' + m.hours() + ') should be correct for local');
    assert.equal(moment().utc().utcOffset(), 0, 'timezone in utc should always be zero');
});

test('creating with utc and no arguments', function (assert) {
    var startOfTest = new Date().valueOf(),
        momentDefaultUtcTime = moment.utc().valueOf(),
        afterMomentCreationTime = new Date().valueOf();

    assert.ok(startOfTest <= momentDefaultUtcTime, 'moment UTC default time should be now, not in the past');
    assert.ok(momentDefaultUtcTime <= afterMomentCreationTime, 'moment UTC default time should be now, not in the future');
});

test('creating with utc and a date parameter array', function (assert) {
    var m = moment.utc([2011, 1, 2, 3, 4, 5, 6]);
    assert.equal(m.date(), 2, 'the day should be correct for utc array');
    assert.equal(m.hours(), 3, 'the hours should be correct for utc array');

    m = moment.utc('2011-02-02 3:04:05', 'YYYY-MM-DD HH:mm:ss');
    assert.equal(m.date(), 2, 'the day should be correct for utc parsing format');
    assert.equal(m.hours(), 3, 'the hours should be correct for utc parsing format');

    m = moment.utc('2011-02-02T03:04:05+00:00');
    assert.equal(m.date(), 2, 'the day should be correct for utc parsing iso');
    assert.equal(m.hours(), 3, 'the hours should be correct for utc parsing iso');
});

test('creating with utc without timezone', function (assert) {
    var m = moment.utc('2012-01-02T08:20:00');
    assert.equal(m.date(), 2, 'the day should be correct for utc parse without timezone');
    assert.equal(m.hours(), 8, 'the hours should be correct for utc parse without timezone');

    m = moment.utc('2012-01-02T08:20:00+09:00');
    assert.equal(m.date(), 1, 'the day should be correct for utc parse with timezone');
    assert.equal(m.hours(), 23, 'the hours should be correct for utc parse with timezone');
});

test('cloning with utc offset', function (assert) {
    var m = moment.utc('2012-01-02T08:20:00');
    assert.equal(moment.utc(m)._isUTC, true, 'the local offset should be converted to UTC');
    assert.equal(moment.utc(m.clone().utc())._isUTC, true, 'the local offset should stay in UTC');

    m.utcOffset(120);
    assert.equal(moment.utc(m)._isUTC, true, 'the explicit utc offset should stay in UTC');
    assert.equal(moment.utc(m).utcOffset(), 0, 'the explicit utc offset should have an offset of 0');
});

test('weekday with utc', function (assert) {
    assert.equal(
        moment('2013-09-15T00:00:00Z').utc().weekday(), // first minute of the day
        moment('2013-09-15T23:59:00Z').utc().weekday(), // last minute of the day
        'a UTC-moment\'s .weekday() should not be affected by the local timezone'
    );
});
