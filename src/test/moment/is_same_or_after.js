import { module, test } from '../qunit';
import moment from '../../moment';

module('is same or after');

test('is same or after without units', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 3, 2, 3, 5, 5, 10))), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 3, 2, 3, 3, 5, 10))), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 4, 2, 3, 4, 5, 10))), false, 'month is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 2, 3, 4, 5, 10))), true, 'month is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 3, 3, 4, 5, 10))), false, 'day is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 1, 3, 4, 5, 10))), true, 'day is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 4, 4, 5, 10))), false, 'hour is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 2, 4, 5, 10))), true, 'hour is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 5, 5, 10))), false, 'minute is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 3, 5, 10))), true, 'minute is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 10))), false, 'second is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 11))), true, 'second is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 10))), true, 'millisecond match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 11))), false, 'millisecond is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 9))), true, 'millisecond is earlier');
    assert.equal(m.isSameOrAfter(m), true, 'moments are the same as themselves');
    assert.equal(+m, +mCopy, 'isSameOrAfter second should not change moment');
});

test('is same or after year', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years'), true, 'plural should work');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), true, 'exact start of year');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), true, 'exact end of year');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), false, 'start of next year');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), true, 'end of previous year');
    assert.equal(m.isSameOrAfter(m, 'year'), true, 'same moments are in the same year');
    assert.equal(+m, +mCopy, 'isSameOrAfter year should not change moment');
});

test('is same or after month', function (assert) {
    var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), true, 'month match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'), true, 'plural should work');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month'), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), false, 'month is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), true, 'month is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), true, 'exact start of month');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), true, 'exact end of month');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), false, 'start of next month');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), true, 'end of previous month');
    assert.equal(m.isSameOrAfter(m, 'month'), true, 'same moments are in the same month');
    assert.equal(+m, +mCopy, 'isSameOrAfter month should not change moment');
});

test('is same or after day', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), true, 'day match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days'), true, 'plural should work');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day'), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 1, 2, 7, 8, 9, 10)), 'day'), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, 'month is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 12, 2, 7, 8, 9, 10)), 'day'), true, 'month is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'), false, 'day is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 1, 7, 8, 9, 10)), 'day'), true, 'day is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day'), true, 'exact start of day');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day'), true, 'exact end of day');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day'), false, 'start of next day');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day'), true, 'end of previous day');
    assert.equal(m.isSameOrAfter(m, 'day'), true, 'same moments are in the same day');
    assert.equal(+m, +mCopy, 'isSameOrAfter day should not change moment');
});

test('is same or after hour', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), true, 'hour match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours'), true, 'plural should work');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour'), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 1, 2, 3, 8, 9, 10)), 'hour'), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour'), false, 'month is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 12, 2, 3, 8, 9, 10)), 'hour'), true, 'month is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour'), false, 'day is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 1, 3, 8, 9, 10)), 'hour'), true, 'day is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour'), false, 'hour is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 2, 8, 9, 10)), 'hour'), true, 'hour is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour'), true, 'exact start of hour');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour'), true, 'exact end of hour');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour'), false, 'start of next hour');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour'), true, 'end of previous hour');
    assert.equal(m.isSameOrAfter(m, 'hour'), true, 'same moments are in the same hour');
    assert.equal(+m, +mCopy, 'isSameOrAfter hour should not change moment');
});

test('is same or after minute', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute'), true, 'minute match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes'), true, 'plural should work');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute'), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 1, 2, 3, 4, 9, 10)), 'minute'), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), false, 'month is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 12, 2, 3, 4, 9, 10)), 'minute'), true, 'month is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute'), false, 'day is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 1, 3, 4, 9, 10)), 'minute'), true, 'day is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute'), false, 'hour is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 2, 4, 9, 10)), 'minute'), true, 'hour is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute'), false, 'minute is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 3, 9, 10)), 'minute'), true, 'minute is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute'), true, 'exact start of minute');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute'), true, 'exact end of minute');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute'), false, 'start of next minute');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute'), true, 'end of previous minute');
    assert.equal(m.isSameOrAfter(m, 'minute'), true, 'same moments are in the same minute');
    assert.equal(+m, +mCopy, 'isSameOrAfter minute should not change moment');
});

test('is same or after second', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second'), true, 'second match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds'), true, 'plural should work');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second'), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 1, 2, 3, 4, 5, 10)), 'second'), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), false, 'month is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 12, 2, 3, 4, 5, 10)), 'second'), true, 'month is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second'), false, 'day is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 1, 3, 4, 5, 10)), 'second'), true, 'day is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second'), false, 'hour is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 2, 4, 5, 10)), 'second'), true, 'hour is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second'), false, 'minute is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 3, 5, 10)), 'second'), true, 'minute is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second'), false, 'second is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 4, 10)), 'second'), true, 'second is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second'), true, 'exact start of second');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second'), true, 'exact end of second');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second'), false, 'start of next second');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second'), true, 'end of previous second');
    assert.equal(m.isSameOrAfter(m, 'second'), true, 'same moments are in the same second');
    assert.equal(+m, +mCopy, 'isSameOrAfter second should not change moment');
});

test('is same or after millisecond', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, 'millisecond match');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds'), true, 'plural should work');
    assert.equal(m.isSameOrAfter(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'year is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, 'year is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), false, 'month is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), true, 'month is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), false, 'day is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), true, 'day is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), false, 'hour is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), true, 'hour is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), false, 'minute is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), true, 'minute is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), false, 'second is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), true, 'second is earlier');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), false, 'millisecond is later');
    assert.equal(m.isSameOrAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), true, 'millisecond is earlier');
    assert.equal(m.isSameOrAfter(m, 'millisecond'), true, 'same moments are in the same millisecond');
    assert.equal(+m, +mCopy, 'isSameOrAfter millisecond should not change moment');
});

test('is same or after with utc offset moments', function (assert) {
    assert.ok(moment.parseZone('2013-02-01T00:00:00-05:00').isSameOrAfter(moment('2013-02-01'), 'year'), 'zoned vs local moment');
    assert.ok(moment('2013-02-01').isSameOrAfter(moment('2013-02-01').utcOffset('-05:00'), 'year'), 'local vs zoned moment');
    assert.ok(moment.parseZone('2013-02-01T00:00:00-05:00').isSameOrAfter(moment.parseZone('2013-02-01T00:00:00-06:30'), 'year'),
            'zoned vs (differently) zoned moment');
});

test('is same or after with invalid moments', function (assert) {
    var m = moment(), invalid = moment.invalid();
    assert.equal(invalid.isSameOrAfter(invalid), false, 'invalid moments are not considered equal');
    assert.equal(m.isSameOrAfter(invalid), false, 'valid moment is not after invalid moment');
    assert.equal(invalid.isSameOrAfter(m), false, 'invalid moment is not after valid moment');
    assert.equal(m.isSameOrAfter(invalid, 'year'), false, 'invalid moment year');
    assert.equal(m.isSameOrAfter(invalid, 'month'), false, 'invalid moment month');
    assert.equal(m.isSameOrAfter(invalid, 'day'), false, 'invalid moment day');
    assert.equal(m.isSameOrAfter(invalid, 'hour'), false, 'invalid moment hour');
    assert.equal(m.isSameOrAfter(invalid, 'minute'), false, 'invalid moment minute');
    assert.equal(m.isSameOrAfter(invalid, 'second'), false, 'invalid moment second');
    assert.equal(m.isSameOrAfter(invalid, 'milliseconds'), false, 'invalid moment milliseconds');
});
