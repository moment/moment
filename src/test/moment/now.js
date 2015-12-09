import { module, test } from '../qunit';
import moment from '../../moment';

module('now');

test('now', function (assert) {
    var startOfTest = new Date().valueOf(),
        momentNowTime = moment.now(),
        afterMomentCreationTime = new Date().valueOf();

    assert.ok(startOfTest <= momentNowTime, 'moment now() time should be now, not in the past');
    assert.ok(momentNowTime <= afterMomentCreationTime, 'moment now() time should be now, not in the future');
});

test('now - custom value', function (assert) {
    var CUSTOM_DATE = '2015-01-01T01:30:00.000Z';

    var oldFn = moment.fn.now;

    moment.fn.now = function () {
        return new Date(CUSTOM_DATE).valueOf();
    };

    try {
        assert.ok(moment().toISOString() === CUSTOM_DATE, 'moment() constructor should use the function defined by moment.now, but it did not');
        assert.ok(moment.utc().toISOString() === CUSTOM_DATE, 'moment() constructor should use the function defined by moment.now, but it did not');
        assert.ok(moment.utc([]).toISOString() === '2015-01-01T00:00:00.000Z', 'moment() constructor should fall back to the date defined by moment.now when an empty array is given, but it did not');
    } finally {
        moment.fn.now = oldFn;
    }
});
