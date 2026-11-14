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

test('custom default date parts', function (assert) {
    var oldNow = moment.now,
        oldGetDefaultDateParts = moment._getDefaultDateParts,
        oldLocale = moment.locale(),
        customTime = Date.UTC(2025, 0, 2, 1),
        calls = 0,
        weekCalls = 0,
        receivedConfig,
        receivedNow,
        receivedThis;

    moment.now = function () {
        return customTime;
    };
    moment.locale('en');
    moment._getDefaultDateParts = function (config, now, forWeek) {
        calls++;
        receivedConfig = config;
        receivedNow = now;
        receivedThis = this;
        if (forWeek) {
            weekCalls++;
        }
        if (!config._useUTC) {
            return [2024, 11, 25];
        }
        return [2030, 6, 1];
    };

    try {
        assert.equal(
            moment('01:23', 'HH:mm').format('YYYY-MM-DD HH:mm'),
            '2024-12-25 01:23',
            'custom date parts should supply omitted local fields'
        );
        assert.equal(receivedNow, customTime, 'should receive the sampled now');
        assert.strictEqual(
            receivedThis,
            moment,
            'should use Moment as the receiver'
        );
        assert.equal(
            receivedConfig._useUTC,
            false,
            'should receive the parsing config'
        );
        assert.equal(
            moment('1', 'e').format('YYYY-MM-DD'),
            '2024-12-23',
            'locale week defaults should use the custom date parts'
        );
        assert.equal(
            moment('1', 'E').format('YYYY-MM-DD'),
            '2024-01-01',
            'ISO week-year defaults should use the custom date parts'
        );
        assert.equal(
            moment.utc('01:23', 'HH:mm').format('YYYY-MM-DD HH:mm'),
            '2030-07-01 01:23',
            'custom date parts should supply omitted UTC fields'
        );
        assert.equal(
            moment.utc('1', 'e').format('YYYY-MM-DD'),
            '2030-07-01',
            'UTC locale week defaults should use the custom date parts'
        );
        assert.equal(
            moment.utc('1', 'E').format('YYYY-MM-DD'),
            '2029-12-31',
            'UTC ISO week-year defaults should use the custom date parts'
        );
        assert.equal(
            moment('1 -08:00', 'e Z').utc().format('YYYY-MM-DD'),
            '2030-07-01',
            'explicit-offset week defaults should use the custom date parts'
        );
        assert.equal(
            moment().valueOf(),
            customTime,
            'no-input construction should retain current-instant semantics'
        );
        assert.equal(
            calls,
            12,
            'no-input construction should not request defaults'
        );
        assert.equal(weekCalls, 5, 'week parsing should identify hook calls');
    } finally {
        moment.now = oldNow;
        moment._getDefaultDateParts = oldGetDefaultDateParts;
        moment.locale(oldLocale);
    }
});

test('default week date preserves updateOffset', function (assert) {
    var oldNow = moment.now,
        oldGetDefaultDateParts = moment._getDefaultDateParts,
        oldUpdateOffset = moment.updateOffset,
        oldLocale = moment.locale(),
        nowCalls = 0,
        calls = 0;

    moment.now = function () {
        nowCalls++;
        return Date.UTC(2025, 0, 5);
    };
    moment.locale('en');
    moment._getDefaultDateParts = function (config, now) {
        return oldGetDefaultDateParts.call(this, config, now);
    };
    moment.updateOffset = function (mom) {
        calls++;
        if (calls === 1) {
            mom._d = new Date(2024, 11, 25);
        }
    };

    try {
        assert.equal(
            moment.utc('1', 'e').format('YYYY-MM-DD'),
            '2024-12-23',
            'two-argument wrappers should retain UTC updateOffset behavior'
        );
        assert.ok(calls > 0, 'should create an offset-adjusted current moment');

        calls = 0;
        assert.equal(
            moment('1 -08:00', 'e Z').utc().format('YYYY-MM-DD'),
            '2024-12-23',
            'two-argument wrappers should retain offset updateOffset behavior'
        );
        assert.ok(calls > 0, 'should adjust the offset current moment');
        assert.equal(nowCalls, 2, 'should sample now once per parse');
    } finally {
        moment.now = oldNow;
        moment._getDefaultDateParts = oldGetDefaultDateParts;
        moment.updateOffset = oldUpdateOffset;
        moment.locale(oldLocale);
    }
});

test('format arrays share one current instant', function (assert) {
    var oldNow = moment.now,
        calls = 0;

    moment.now = function () {
        calls++;
        return Date.UTC(2025, 0, 5);
    };

    try {
        moment('01:23', ['HH:mm', 'H:mm']);
        assert.equal(calls, 1, 'should sample now once for every candidate');
    } finally {
        moment.now = oldNow;
    }
});

test('complete dates with day of year do not need current date', function (assert) {
    var oldNow = moment.now,
        calls = 0;

    moment.now = function () {
        calls++;
        return Date.UTC(2025, 0, 5);
    };

    try {
        assert.equal(
            moment('2020-01-02 123', 'YYYY-MM-DD DDD').format('YYYY-MM-DD'),
            '2020-05-02',
            'day of year should take precedence over the calendar date'
        );
        assert.equal(
            moment('2020-01-02 123', ['YYYY-MM-DD DDDD']).format('YYYY-MM-DD'),
            '2020-05-02',
            'format arrays should accept a complete date with day of year'
        );
        assert.equal(calls, 0, 'complete dates should not sample now');
    } finally {
        moment.now = oldNow;
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
