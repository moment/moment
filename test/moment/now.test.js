import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('now', () => {
    test('now', () => {
        var startOfTest = new Date().valueOf(),
            momentNowTime = moment.now(),
            afterMomentCreationTime = new Date().valueOf();

        expect(
            startOfTest <= momentNowTime,
            'moment now() time should be now, not in the past'
        ).toBeTruthy();
        expect(
            momentNowTime <= afterMomentCreationTime,
            'moment now() time should be now, not in the future'
        ).toBeTruthy();
    });

    test('now - Date mocked', () => {
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
            expect(
                moment().valueOf(),
                'moment now() time should use the global Date object'
            ).toBe(customTimeMs);
        } finally {
            // eslint-disable-next-line
            Date = RealDate;
        }
    });

    test('now - custom value', () => {
        var customTimeStr = '2015-01-01T01:30:00.000Z',
            customTime = moment(customTimeStr, moment.ISO_8601).valueOf(),
            oldFn = moment.now;

        moment.now = function () {
            return customTime;
        };

        try {
            expect(
                moment().toISOString(),
                'moment() constructor should use the function defined by moment.now, but it did not'
            ).toBe(customTimeStr);
            expect(
                moment.utc().toISOString(),
                'moment() constructor should use the function defined by moment.now, but it did not'
            ).toBe(customTimeStr);
        } finally {
            moment.now = oldFn;
        }
    });

    test('empty object, empty array', () => {
        function assertIsNow(gen, msg) {
            var before = +new Date(),
                mid = gen(),
                after = +new Date();
            expect(
                before <= +mid && +mid <= after,
                'should be now : ' + msg
            ).toBeTruthy();
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
});
