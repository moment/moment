import { module, test, expect } from '../qunit';
import moment from '../../moment';

module('now');

test('now', function (assert) {
    var startOfTest = new Date().valueOf(),
        momentNowTime = moment.now(),
        afterMomentCreationTime = new Date().valueOf();

    assert.ok(startOfTest <= momentNowTime, 'moment now() time should be now, not in the past');
    assert.ok(momentNowTime <= afterMomentCreationTime, 'moment now() time should be now, not in the future');
});

test('now - Date mocked', function (assert) {
    // We need to test mocking the global Date object, so disable 'Read Only' jshint check
    /* jshint -W020 */
    var RealDate = Date,
        customTimeMs = moment('2015-01-01T01:30:00.000Z').valueOf();

    function MockDate() {
        return new RealDate(customTimeMs);
    }

    MockDate.now = function () {
        return new MockDate().valueOf();
    };

    MockDate.prototype = RealDate.prototype;

    Date = MockDate;

    try {
        assert.equal(moment().valueOf(), customTimeMs, 'moment now() time should use the global Date object');
    } finally {
        Date = RealDate;
    }
});

test('now - custom value', function (assert) {
    var customTimeStr = '2015-01-01T01:30:00.000Z',
        customTime = moment(customTimeStr, moment.ISO_8601).valueOf(),
        oldFn = moment.now;

    moment.now = function () {
        return customTime;
    };

    try {
        assert.ok(moment().toISOString() === customTimeStr, 'moment() constructor should use the function defined by moment.now, but it did not');
        assert.ok(moment.utc().toISOString() === customTimeStr, 'moment() constructor should use the function defined by moment.now, but it did not');
    } finally {
        moment.now = oldFn;
    }
});

test('now - empty object', function (assert) {
    var defaultNowTime = moment.now(),
        defaultUtcTime = moment.utc(),
        emptyObjNowTime = moment.now({}),
        emptyObjUtcTime = moment.utc({});

    assert.ok(Math.abs(defaultNowTime - emptyObjNowTime) <= 1, 'moment.now({}) should give the same result as calling moment.now(), but it did not');
    assert.ok(Math.abs(defaultUtcTime - emptyObjUtcTime) <= 1, 'moment.utc({}) should give the same result as calling moment.utc(), but it did not');
});

test('now - empty array', function (assert) {
    var defaultNowTime = moment.now(),
        defaultUtcTime = moment.utc(),
        emptyArrNowTime = moment.now([]),
        emptyArrUtcTime = moment.utc([]);

    assert.ok(Math.abs(defaultNowTime - emptyArrNowTime) <= 1, 'moment.now([]) should give the same result as calling moment.now(), but it did not');
    assert.ok(Math.abs(defaultUtcTime - emptyArrUtcTime) <= 1, 'moment.utc([]) should give the same result as calling moment.utc(), but it did not');
});
