import { module, test } from '../qunit';
import moment from '../../moment';

module('start and end of units');

test('start of year', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('year'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('years'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('y');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 0, 'strip out the month');
    assert.equal(m.date(), 1, 'strip out the day');
    assert.equal(m.hours(), 0, 'strip out the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of year', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('year'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('years'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('y');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 11, 'set the month');
    assert.equal(m.date(), 31, 'set the day');
    assert.equal(m.hours(), 23, 'set the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of quarter', function (assert) {
    var m = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarter'),
        ms = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarters'),
        ma = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('Q');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.quarter(), 2, 'keep the quarter');
    assert.equal(m.month(), 3, 'strip out the month');
    assert.equal(m.date(), 1, 'strip out the day');
    assert.equal(m.hours(), 0, 'strip out the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of quarter', function (assert) {
    var m = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarter'),
        ms = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarters'),
        ma = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('Q');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.quarter(), 2, 'keep the quarter');
    assert.equal(m.month(), 5, 'set the month');
    assert.equal(m.date(), 30, 'set the day');
    assert.equal(m.hours(), 23, 'set the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of month', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('month'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('months'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('M');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 1, 'strip out the day');
    assert.equal(m.hours(), 0, 'strip out the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of month', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('month'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('months'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('M');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 28, 'set the day');
    assert.equal(m.hours(), 23, 'set the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of week', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('week'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('weeks'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('w');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 0, 'rolls back to January');
    assert.equal(m.day(), 0, 'set day of week');
    assert.equal(m.date(), 30, 'set correct date');
    assert.equal(m.hours(), 0, 'strip out the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of week', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('week'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.day(), 6, 'set the day of the week');
    assert.equal(m.date(), 5, 'set the day');
    assert.equal(m.hours(), 23, 'set the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of iso-week', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeek'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeeks'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('W');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 0, 'rollback to January');
    assert.equal(m.isoWeekday(), 1, 'set day of iso-week');
    assert.equal(m.date(), 31, 'set correct date');
    assert.equal(m.hours(), 0, 'strip out the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of iso-week', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeek'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeeks'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('W');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.isoWeekday(), 7, 'set the day of the week');
    assert.equal(m.date(), 6, 'set the day');
    assert.equal(m.hours(), 23, 'set the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of day', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('day'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('days'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('d');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 0, 'strip out the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of day', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('day'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('days'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('d');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 23, 'set the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of date', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('date'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('dates');

    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 0, 'strip out the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of date', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('date'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('dates');

    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 23, 'set the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});


test('start of hour', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hour'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hours'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('h');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 3, 'keep the hours');
    assert.equal(m.minutes(), 0, 'strip out the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of hour', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hour'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hours'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('h');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 3, 'keep the hours');
    assert.equal(m.minutes(), 59, 'set the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of minute', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minute'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minutes'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('m');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 3, 'keep the hours');
    assert.equal(m.minutes(), 4, 'keep the minutes');
    assert.equal(m.seconds(), 0, 'strip out the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of minute', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minute'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minutes'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('m');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 3, 'keep the hours');
    assert.equal(m.minutes(), 4, 'keep the minutes');
    assert.equal(m.seconds(), 59, 'set the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('start of second', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('second'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('seconds'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('s');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 3, 'keep the hours');
    assert.equal(m.minutes(), 4, 'keep the minutes');
    assert.equal(m.seconds(), 5, 'keep the seconds');
    assert.equal(m.milliseconds(), 0, 'strip out the milliseconds');
});

test('end of second', function (assert) {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('second'),
        ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('seconds'),
        ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('s');
    assert.equal(+m, +ms, 'Plural or singular should work');
    assert.equal(+m, +ma, 'Full or abbreviated should work');
    assert.equal(m.year(), 2011, 'keep the year');
    assert.equal(m.month(), 1, 'keep the month');
    assert.equal(m.date(), 2, 'keep the day');
    assert.equal(m.hours(), 3, 'keep the hours');
    assert.equal(m.minutes(), 4, 'keep the minutes');
    assert.equal(m.seconds(), 5, 'keep the seconds');
    assert.equal(m.milliseconds(), 999, 'set the seconds');
});

test('startOf across DST +1', function (assert) {
    var oldUpdateOffset = moment.updateOffset,
        // Based on a real story somewhere in America/Los_Angeles
        dstAt = moment('2014-03-09T02:00:00-08:00').parseZone(),
        m;

    moment.updateOffset = function (mom, keepTime) {
        if (mom.isBefore(dstAt)) {
            mom.utcOffset(-8, keepTime);
        } else {
            mom.utcOffset(-7, keepTime);
        }
    };

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    m.startOf('y');
    assert.equal(m.format(), '2014-01-01T00:00:00-08:00', 'startOf(\'year\') across +1');

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    m.startOf('M');
    assert.equal(m.format(), '2014-03-01T00:00:00-08:00', 'startOf(\'month\') across +1');

    m = moment('2014-03-09T09:00:00-07:00').parseZone();
    m.startOf('d');
    assert.equal(m.format(), '2014-03-09T00:00:00-08:00', 'startOf(\'day\') across +1');

    m = moment('2014-03-09T03:05:00-07:00').parseZone();
    m.startOf('h');
    assert.equal(m.format(), '2014-03-09T03:00:00-07:00', 'startOf(\'hour\') after +1');

    m = moment('2014-03-09T01:35:00-08:00').parseZone();
    m.startOf('h');
    assert.equal(m.format(), '2014-03-09T01:00:00-08:00', 'startOf(\'hour\') before +1');

    // There is no such time as 2:30-7 to try startOf('hour') across that

    moment.updateOffset = oldUpdateOffset;
});

test('startOf across DST -1', function (assert) {
    var oldUpdateOffset = moment.updateOffset,
        // Based on a real story somewhere in America/Los_Angeles
        dstAt = moment('2014-11-02T02:00:00-07:00').parseZone(),
        m;

    moment.updateOffset = function (mom, keepTime) {
        if (mom.isBefore(dstAt)) {
            mom.utcOffset(-7, keepTime);
        } else {
            mom.utcOffset(-8, keepTime);
        }
    };

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    m.startOf('y');
    assert.equal(m.format(), '2014-01-01T00:00:00-07:00', 'startOf(\'year\') across -1');

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    m.startOf('M');
    assert.equal(m.format(), '2014-11-01T00:00:00-07:00', 'startOf(\'month\') across -1');

    m = moment('2014-11-02T09:00:00-08:00').parseZone();
    m.startOf('d');
    assert.equal(m.format(), '2014-11-02T00:00:00-07:00', 'startOf(\'day\') across -1');

    // note that utc offset is -8
    m = moment('2014-11-02T01:30:00-08:00').parseZone();
    m.startOf('h');
    assert.equal(m.format(), '2014-11-02T01:00:00-08:00', 'startOf(\'hour\') after +1');

    // note that utc offset is -7
    m = moment('2014-11-02T01:30:00-07:00').parseZone();
    m.startOf('h');
    assert.equal(m.format(), '2014-11-02T01:00:00-07:00', 'startOf(\'hour\') before +1');

    moment.updateOffset = oldUpdateOffset;
});

test('endOf millisecond and no-arg', function (assert) {
    var m = moment();
    assert.equal(+m, +m.clone().endOf(), 'endOf without argument should change time');
    assert.equal(+m, +m.clone().endOf('ms'), 'endOf with ms argument should change time');
    assert.equal(+m, +m.clone().endOf('millisecond'), 'endOf with millisecond argument should change time');
    assert.equal(+m, +m.clone().endOf('milliseconds'), 'endOf with milliseconds argument should change time');
});

test('startOf for year zero', function (assert) {
    var m = moment('0000-02-29T12:34:56.789Z').parseZone();
    assert.equal(m.clone().startOf('ms').toISOString(), '0000-02-29T12:34:56.789Z',  'startOf millisecond should preserve year');
    assert.equal(m.clone().startOf('s').toISOString(), '0000-02-29T12:34:56.000Z', 'startOf second should preserve year');
    assert.equal(m.clone().startOf('m').toISOString(), '0000-02-29T12:34:00.000Z', 'startOf minute should preserve year');
    assert.equal(m.clone().startOf('h').toISOString(), '0000-02-29T12:00:00.000Z', 'startOf hour should preserve year');
    assert.equal(m.clone().startOf('d').toISOString(), '0000-02-29T00:00:00.000Z', 'startOf day should preserve year');
    assert.equal(m.clone().startOf('M').toISOString(), '0000-02-01T00:00:00.000Z', 'startOf month should preserve year');
    assert.equal(m.clone().startOf('Q').toISOString(), '0000-01-01T00:00:00.000Z', 'startOf quarter should preserve year');
    assert.equal(m.clone().startOf('y').toISOString(), '0000-01-01T00:00:00.000Z', 'startOf year should preserve year');
});

test('endOf for year zero', function (assert) {
    var m = moment('0000-02-29T12:34:56.789Z').parseZone();
    assert.equal(m.clone().endOf('ms').toISOString(), '0000-02-29T12:34:56.789Z',  'endOf millisecond should preserve year');
    assert.equal(m.clone().endOf('s').toISOString(), '0000-02-29T12:34:56.999Z', 'endOf second should preserve year');
    assert.equal(m.clone().endOf('m').toISOString(), '0000-02-29T12:34:59.999Z', 'endOf minute should preserve year');
    assert.equal(m.clone().endOf('h').toISOString(), '0000-02-29T12:59:59.999Z', 'endOf hour should preserve year');
    assert.equal(m.clone().endOf('d').toISOString(), '0000-02-29T23:59:59.999Z', 'endOf day should preserve year');
    assert.equal(m.clone().endOf('M').toISOString(), '0000-02-29T23:59:59.999Z', 'endOf month should preserve year');
    assert.equal(m.clone().endOf('Q').toISOString(), '0000-03-31T23:59:59.999Z', 'endOf quarter should preserve year');
    assert.equal(m.clone().endOf('y').toISOString(), '0000-12-31T23:59:59.999Z', 'endOf year should preserve year');
});
