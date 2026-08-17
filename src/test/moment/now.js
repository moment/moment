import { module, test } from '../qunit';
import moment from '../../moment';

module('now');

test('now', function (assert) {
    var startOfTest = new Date().valueOf(),
        momentNowTime = moment.now(),
        afterMomentCreationTime = new Date().valueOf();

    assert.ok(
        startOfTest <= momentNowTime,
        'moment now() time should be now, not in the past'
    );
    assert.ok(
        momentNowTime <= afterMomentCreationTime,
        'moment now() time should be now, not in the future'
    );
});

test('now - Date mocked', function (assert) {
    var RealDate = Date,
        customTimeMs = moment('2015-01-01T01:30:00.000Z').valueOf();

    function MockDate() {
        return new RealDate(customTimeMs);
    }

    MockDate.now = function () {
        return new MockDate().valueOf();
    };

    MockDate.prototype = RealDate.prototype;

    // eslint-disable-next-line
    Date = MockDate;

    try {
        assert.equal(
            moment().valueOf(),
            customTimeMs,
            'moment now() time should use the global Date object'
        );
    } finally {
        // eslint-disable-next-line
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
        assert.equal(
            moment().toISOString(),
            customTimeStr,
            'moment() constructor should use the function defined by moment.now, but it did not'
        );
        assert.equal(
            moment.utc().toISOString(),
            customTimeStr,
            'moment() constructor should use the function defined by moment.now, but it did not'
        );
    } finally {
        moment.now = oldFn;
    }
});

test('empty object, empty array', function (assert) {
    function assertIsNow(gen, msg) {
        var before = +new Date(),
            mid = gen(),
            after = +new Date();
        assert.ok(before <= +mid && +mid <= after, 'should be now : ' + msg);
    }
    assertIsNow(function () {
        return moment();
    }, 'moment()');
    assertIsNow(function () {
        return moment([]);
    }, 'moment([])');
    assertIsNow(function () {
        return moment({});
    }, 'moment({})');
    assertIsNow(function () {
        return moment.utc();
    }, 'moment.utc()');
    assertIsNow(function () {
        return moment.utc([]);
    }, 'moment.utc([])');
    assertIsNow(function () {
        return moment.utc({});
    }, 'moment.utc({})');
});
