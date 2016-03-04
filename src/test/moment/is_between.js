import { module, test } from '../qunit';
import moment from '../../moment';

module('is between');

test('is between without units', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'year is later');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2013, 3, 2, 3, 4, 5, 10))), false, 'year is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10))), true, 'year is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'month is later');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 5, 2, 3, 4, 5, 10))), false, 'month is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 2, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 4, 2, 3, 4, 5, 10))), true, 'month is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 1, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'day is later');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 4, 3, 4, 5, 10))), false, 'day is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 1, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 3, 3, 4, 5, 10))), true, 'day is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 1, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'hour is later');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 5, 4, 5, 10))), false, 'hour is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 2, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 4, 4, 5, 10))), true, 'hour is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 6, 5, 10))), false, 'minute is later');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 2, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'minute is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 3, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 5, 5, 10))), true, 'minute is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 7, 10))), false, 'second is later');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 3, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'second is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 4, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 6, 10))), true, 'second is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 12))), false, 'millisecond is later');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 8)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'millisecond is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 9)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 11))), true, 'millisecond is between');
    assert.equal(m.isBetween(m, m), false, 'moments are not between themselves');
    assert.equal(+m, +mCopy, 'isBetween second should not change moment');
});

test('is between without units inclusivity', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '()'), false, 'start and end are excluded, start is equal to moment');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '()'), false, 'start and end are excluded, end is equal to moment');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '()'), true, 'start and end are excluded, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), null, '()'), false, 'start and end are excluded, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '()'), false, 'start and end are excluded, should fail on same start/end date.');

    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '(]'), false, 'start is excluded and end is included should fail on same start date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '(]'), true, 'start is excluded and end is included should succeed on end date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '(]'), true, 'start is excluded and end is included, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), null, '(]'), false, 'start is excluded and end is included, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '(]'), false, 'start is excluded and end is included, should fail on same start/end date.');

    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '[)'), true, 'start is included and end is excluded should succeed on same start date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '[)'), false, 'start is included and end is excluded should fail on same end date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '[)'), true, 'start is included and end is excluded, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), null, '[)'), false, 'start is included and end is excluded, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '[)'), false, 'start is included and end is excluded, should fail on same end and start date');

    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '[]'), true, 'start and end inclusive should succeed on same start date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '[]'), true, 'start and end inclusive should succeed on same end date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), null, '[]'), true, 'start and end inclusive, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), null, '[]'), false, 'start and end inclusive, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), null, '[]'), true, 'start and end inclusive, should handle same end and start date');
});

test('is between milliseconds inclusivity', function (assert) {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds'), true, 'options, no inclusive');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '()'), false, 'start and end are excluded, start is equal to moment');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '()'), false, 'start and end are excluded, end is equal to moment');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '()'), true, 'start and end are excluded, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds', '()'), false, 'start and end are excluded, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '()'), false, 'start and end are excluded, should fail on same start/end date.');

    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '(]'), false, 'start is excluded and end is included should fail on same start date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '(]'), true, 'start is excluded and end is included should succeed on end date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '(]'), true, 'start is excluded and end is included, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds', '(]'), false, 'start is excluded and end is included, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '(]'), false, 'start is excluded and end is included, should fail on same start/end date.');

    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[)'), true, 'start is included and end is excluded should succeed on same start date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[)'), false, 'start is included and end is excluded should fail on same end date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[)'), true, 'start is included and end is excluded, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[)'), false, 'start is included and end is excluded, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[)'), false, 'start is included and end is excluded, should fail on same end and start date');

    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[]'), true, 'start and end inclusive should succeed on same start date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[]'), true, 'start and end inclusive should succeed on same end date');
    assert.equal(m.isBetween(
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[]'), true, 'start and end inclusive, is between');
    assert.equal(m.isBetween(
        moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[]'), false, 'start and end inclusive, is not between');
    assert.equal(m.isBetween(
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
        moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds', '[]'), true, 'start and end inclusive, should handle same end and start date');
});

test('is between year', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year match');
    assert.equal(m.isBetween(
                moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'years'), true, 'plural should work');
    assert.equal(m.isBetween(
                moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is later');
    assert.equal(m.isBetween(m, 'year'), false, 'same moments are not between the same year');
    assert.equal(+m, +mCopy, 'isBetween year should not change moment');
});

test('is between month', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), false, 'month match');
    assert.equal(m.isBetween(
                moment(new Date(2011, 0, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'), true, 'plural should work');
    assert.equal(m.isBetween(
                moment(new Date(2011, 0, 31, 23, 59, 59, 999)),
                moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), true, 'month is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), false, 'month is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 11, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), false, 'month is later');
    assert.equal(m.isBetween(m, 'month'), false, 'same moments are not between the same month');
    assert.equal(+m, +mCopy, 'isBetween month should not change moment');
});

test('is between day', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), false, 'day match');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'days'), true, 'plural should work');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'), true, 'day is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 4, 7, 8, 9, 10)), 'day'), false, 'day is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), false, 'day is later');
    assert.equal(m.isBetween(m, 'day'), false, 'same moments are not between the same day');
    assert.equal(+m, +mCopy, 'isBetween day should not change moment');
});

test('is between hour', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 5, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 9, 9, 10)), 'hour'), false, 'hour match');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 1, 59, 59, 999)),
                moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hours'), true, 'plural should work');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 2, 59, 59, 999)),
                moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour'), true, 'hour is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'hour'), false, 'hour is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'hour'), false, 'hour is later');
    assert.equal(m.isBetween(m, 'hour'), false, 'same moments are not between the same hour');
    assert.equal(+m, +mCopy, 'isBetween hour should not change moment');
});

test('is between minute', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute'), false, 'minute match');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 3, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minutes'), true, 'plural should work');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 3, 59, 999)),
                moment(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute'), true, 'minute is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 5, 0, 0)),
                moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'minute'), false, 'minute is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 2, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute'), false, 'minute is later');
    assert.equal(m.isBetween(m, 'minute'), false, 'same moments are not between the same minute');
    assert.equal(+m, +mCopy, 'isBetween minute should not change moment');
});

test('is between second', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second'), false, 'second match');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 4, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 6, 10)), 'seconds'), true, 'plural should work');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 4, 999)),
                moment(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second'), true, 'second is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 6, 0)),
                moment(new Date(2011, 1, 2, 3, 4, 7, 10)), 'second'), false, 'second is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 3, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second'), false, 'second is later');
    assert.equal(m.isBetween(m, 'second'), false, 'same moments are not between the same second');
    assert.equal(+m, +mCopy, 'isBetween second should not change moment');
});

test('is between millisecond', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 6)), 'millisecond'), false, 'millisecond match');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 5)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 7)), 'milliseconds'), true, 'plural should work');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 5)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 7)), 'millisecond'), true, 'millisecond is between');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 7)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'millisecond'), false, 'millisecond is earlier');
    assert.equal(m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 4)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 6)), 'millisecond'), false, 'millisecond is later');
    assert.equal(m.isBetween(m, 'millisecond'), false, 'same moments are not between the same millisecond');
    assert.equal(+m, +mCopy, 'isBetween millisecond should not change moment');
});
