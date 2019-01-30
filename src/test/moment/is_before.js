import { module, test } from '../qunit';
import moment from '../../moment';

module('is before');

test('is after without units', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 5, 5, 10))), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 2, 3, 3, 5, 10))), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10))), true, 'month is later');
    assert.equal(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10))), false, 'month is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10))), true, 'day is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 3, 4, 5, 10))), false, 'day is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10))), true, 'hour is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 2, 4, 5, 10))), false, 'hour is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10))), true, 'minute is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10))), false, 'minute is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10))), true, 'second is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 11))), false, 'second is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'millisecond match');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 11))), true, 'millisecond is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 9))), false, 'millisecond is earlier');
    assert.equal(m.isBefore(m), false, 'moments are not before themselves');
    assert.equal(+m, +mCopy, 'isBefore second should not change moment');
});

test('is before year', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year match');
    assert.equal(m.isBefore(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'years'), true, 'plural should work');
    assert.equal(m.isBefore(moment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), false, 'exact start of year');
    assert.equal(m.isBefore(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), false, 'exact end of year');
    assert.equal(m.isBefore(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), true, 'start of next year');
    assert.equal(m.isBefore(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), false, 'end of previous year');
    assert.equal(m.isBefore(moment(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year'), false, 'end of year far before');
    assert.equal(m.isBefore(m, 'year'), false, 'same moments are not before the same year');
    assert.equal(+m, +mCopy, 'isBefore year should not change moment');
});

test('is before month', function (assert) {
    var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), false, 'month match');
    assert.equal(m.isBefore(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'months'), true, 'plural should work');
    assert.equal(m.isBefore(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month'), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), true, 'month is later');
    assert.equal(m.isBefore(moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), false, 'month is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), false, 'exact start of month');
    assert.equal(m.isBefore(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), false, 'exact end of month');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), true, 'start of next month');
    assert.equal(m.isBefore(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), false, 'end of previous month');
    assert.equal(m.isBefore(moment(new Date(2010, 12, 31, 23, 59, 59, 999)), 'month'), false, 'later month but earlier year');
    assert.equal(m.isBefore(m, 'month'), false, 'same moments are not before the same month');
    assert.equal(+m, +mCopy, 'isBefore month should not change moment');
});

test('is before day', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day'), false, 'day match');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'days'), true, 'plural should work');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day'), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day'), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day'), true, 'month is later');
    assert.equal(m.isBefore(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, 'month is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day'), true, 'day is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day'), false, 'day is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day'), false, 'exact start of day');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day'), false, 'exact end of day');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day'), true, 'start of next day');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day'), false, 'end of previous day');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day'), false, 'later day but earlier year');
    assert.equal(m.isBefore(m, 'day'), false, 'same moments are not before the same day');
    assert.equal(+m, +mCopy, 'isBefore day should not change moment');
});

test('is before hour', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'hour match');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hours'), true, 'plural should work');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour'), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour'), true, 'month is later');
    assert.equal(m.isBefore(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), false, 'month is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour'), true, 'day is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour'), false, 'day is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour'), true, 'hour is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'hour is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour'), false, 'exact start of hour');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour'), false, 'exact end of hour');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour'), true, 'start of next hour');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour'), false, 'end of previous hour');
    assert.equal(m.isBefore(m, 'hour'), false, 'same moments are not before the same hour');
    assert.equal(+m, +mCopy, 'isBefore hour should not change moment');
});

test('is before minute', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute'), false, 'minute match');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minutes'), true, 'plural should work');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute'), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute'), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute'), true, 'month is later');
    assert.equal(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), false, 'month is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute'), true, 'day is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute'), false, 'day is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute'), true, 'hour is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute'), false, 'hour is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute'), true, 'minute is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute'), false, 'minute is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute'), false, 'exact start of minute');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute'), false, 'exact end of minute');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute'), true, 'start of next minute');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute'), false, 'end of previous minute');
    assert.equal(m.isBefore(m, 'minute'), false, 'same moments are not before the same minute');
    assert.equal(+m, +mCopy, 'isBefore minute should not change moment');
});

test('is before second', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second'), false, 'second match');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'seconds'), true, 'plural should work');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second'), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second'), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second'), true, 'month is later');
    assert.equal(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), false, 'month is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second'), true, 'day is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second'), false, 'day is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second'), true, 'hour is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second'), false, 'hour is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second'), true, 'minute is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second'), false, 'minute is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second'), true, 'second is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second'), false, 'second is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second'), false, 'exact start of second');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second'), false, 'exact end of second');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second'), true, 'start of next second');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second'), false, 'end of previous second');
    assert.equal(m.isBefore(m, 'second'), false, 'same moments are not before the same second');
    assert.equal(+m, +mCopy, 'isBefore second should not change moment');
});

test('is before millisecond', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'millisecond match');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds'), false, 'plural should work');
    assert.equal(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, 'year is later');
    assert.equal(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'year is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), true, 'month is later');
    assert.equal(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), false, 'month is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), true, 'day is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), false, 'day is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), true, 'hour is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), false, 'hour is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), true, 'minute is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), false, 'minute is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), true, 'second is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), false, 'second is earlier');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), true, 'millisecond is later');
    assert.equal(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), false, 'millisecond is earlier');
    assert.equal(m.isBefore(m, 'millisecond'), false, 'same moments are not before the same millisecond');
    assert.equal(+m, +mCopy, 'isBefore millisecond should not change moment');
});

test('is before invalid', function (assert) {
    var m = moment(), invalid = moment.invalid();
    assert.equal(m.isBefore(invalid), false, 'valid moment is not before invalid moment');
    assert.equal(invalid.isBefore(m), false, 'invalid moment is not before valid moment');
    assert.equal(m.isBefore(invalid, 'year'), false, 'invalid moment year');
    assert.equal(m.isBefore(invalid, 'month'), false, 'invalid moment month');
    assert.equal(m.isBefore(invalid, 'day'), false, 'invalid moment day');
    assert.equal(m.isBefore(invalid, 'hour'), false, 'invalid moment hour');
    assert.equal(m.isBefore(invalid, 'minute'), false, 'invalid moment minute');
    assert.equal(m.isBefore(invalid, 'second'), false, 'invalid moment second');
    assert.equal(m.isBefore(invalid, 'milliseconds'), false, 'invalid moment milliseconds');
});
