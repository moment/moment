import { module, test } from '../qunit';
import moment from '../../moment';

module('getters and setters');

test('getters', function (assert) {
    var a = moment([2011, 9, 12, 6, 7, 8, 9]);
    assert.equal(a.year(), 2011, 'year');
    assert.equal(a.month(), 9, 'month');
    assert.equal(a.date(), 12, 'date');
    assert.equal(a.day(), 3, 'day');
    assert.equal(a.hours(), 6, 'hour');
    assert.equal(a.minutes(), 7, 'minute');
    assert.equal(a.seconds(), 8, 'second');
    assert.equal(a.milliseconds(), 9, 'milliseconds');
});

test('getters programmatic', function (assert) {
    var a = moment([2011, 9, 12, 6, 7, 8, 9]);
    assert.equal(a.get('year'), 2011, 'year');
    assert.equal(a.get('month'), 9, 'month');
    assert.equal(a.get('date'), 12, 'date');
    assert.equal(a.get('day'), 3, 'day');
    assert.equal(a.get('hour'), 6, 'hour');
    assert.equal(a.get('minute'), 7, 'minute');
    assert.equal(a.get('second'), 8, 'second');
    assert.equal(a.get('milliseconds'), 9, 'milliseconds');

    //actual getters tested elsewhere
    assert.equal(a.get('weekday'), a.weekday(), 'weekday');
    assert.equal(a.get('isoWeekday'), a.isoWeekday(), 'isoWeekday');
    assert.equal(a.get('week'), a.week(), 'week');
    assert.equal(a.get('isoWeek'), a.isoWeek(), 'isoWeek');
    assert.equal(a.get('dayOfYear'), a.dayOfYear(), 'dayOfYear');

    //getter no longer sets values when passed an object
    assert.equal(moment([2016,0,1]).get({year:2015}).year(), 2016, 'getter no longer sets values when passed an object');
});

test('setters plural', function (assert) {
    test.expectedDeprecations('years accessor', 'months accessor', 'dates accessor');

    var a = moment()
        .years(2011)
        .months(9)
        .dates(12)
        .hours(6)
        .minutes(7)
        .seconds(8)
        .milliseconds(9);

    assert.equal(a.years(), 2011, 'years');
    assert.equal(a.months(), 9, 'months');
    assert.equal(a.dates(), 12, 'dates');
    assert.equal(a.days(), 3, 'days');
    assert.equal(a.hours(), 6, 'hours');
    assert.equal(a.minutes(), 7, 'minutes');
    assert.equal(a.seconds(), 8, 'seconds');
    assert.equal(a.milliseconds(), 9, 'milliseconds');
});

test('setters singular', function (assert) {
    var a = moment()
        .year(2011)
        .month(9)
        .date(12)
        .hour(6)
        .minute(7)
        .second(8)
        .millisecond(9);

    assert.equal(a.year(), 2011, 'year');
    assert.equal(a.month(), 9, 'month');
    assert.equal(a.date(), 12, 'date');
    assert.equal(a.day(), 3, 'day');
    assert.equal(a.hour(), 6, 'hour');
    assert.equal(a.minute(), 7, 'minute');
    assert.equal(a.second(), 8, 'second');
    assert.equal(a.millisecond(), 9, 'milliseconds');
});

test('setters', function (assert) {
    var a = moment()
        .year(2011)
        .month(9)
        .date(12)
        .hours(6)
        .minutes(7)
        .seconds(8)
        .milliseconds(9);

    assert.equal(a.year(), 2011, 'year');
    assert.equal(a.month(), 9, 'month');
    assert.equal(a.date(), 12, 'date');
    assert.equal(a.day(), 3, 'day');
    assert.equal(a.hours(), 6, 'hour');
    assert.equal(a.minutes(), 7, 'minute');
    assert.equal(a.seconds(), 8, 'second');
    assert.equal(a.milliseconds(), 9, 'milliseconds');

    // Test month() behavior. See https://github.com/timrwood/moment/pull/822
    a = moment('20130531', 'YYYYMMDD');
    a = a.month(3);
    assert.equal(a.month(), 3, 'month edge case');
});

test('setter programmatic', function (assert) {
    var a = moment()
        .set('year', 2011)
        .set('month', 9)
        .set('date', 12)
        .set('hours', 6)
        .set('minutes', 7)
        .set('seconds', 8)
        .set('milliseconds', 9);

    assert.equal(a.year(), 2011, 'year');
    assert.equal(a.month(), 9, 'month');
    assert.equal(a.date(), 12, 'date');
    assert.equal(a.day(), 3, 'day');
    assert.equal(a.hours(), 6, 'hour');
    assert.equal(a.minutes(), 7, 'minute');
    assert.equal(a.seconds(), 8, 'second');
    assert.equal(a.milliseconds(), 9, 'milliseconds');

    // Test month() behavior. See https://github.com/timrwood/moment/pull/822
    a = moment('20130531', 'YYYYMMDD');
    a = a.month(3);
    assert.equal(a.month(), 3, 'month edge case');
});

test('setters programatic with weeks', function (assert) {
    var a = moment()
        .set('weekYear', 2001)
        .set('week', 49)
        .set('day', 4);

    assert.equal(a.weekYear(), 2001, 'weekYear');
    assert.equal(a.week(), 49, 'week');
    assert.equal(a.day(), 4, 'day');

    a = a.set('weekday', 1);
    assert.equal(a.weekday(), 1, 'weekday');
});

test('setters programatic with weeks ISO', function (assert) {
    var a = moment()
        .set('isoWeekYear', 2001)
        .set('isoWeek', 49)
        .set('isoWeekday', 4);

    assert.equal(a.isoWeekYear(), 2001, 'isoWeekYear');
    assert.equal(a.isoWeek(), 49, 'isoWeek');
    assert.equal(a.isoWeekday(), 4, 'isoWeekday');
});

test('setters strings', function (assert) {
    var a = moment([2012]).locale('en');
    assert.equal(a.day(0).day('Wednesday').day(), 3, 'day full name');
    assert.equal(a.day(0).day('Wed').day(), 3, 'day short name');
    assert.equal(a.day(0).day('We').day(), 3, 'day minimal name');
    assert.equal(a.day(0).day('invalid').day(), 0, 'invalid day name');
    assert.equal(a.month(0).month('April').month(), 3, 'month full name');
    assert.equal(a.month(0).month('Apr').month(), 3, 'month short name');
    assert.equal(a.month(0).month('invalid').month(), 0, 'invalid month name');
});

test('setters - falsey values', function (assert) {
    var a = moment();
    // ensure minutes wasn't coincidentally 0 already
    a = a.minutes(1);
    a = a.minutes(0);
    assert.equal(a.minutes(), 0, 'falsey value');
});

test('setter with multiple unit values', function (assert) {
    var a = moment()
        .set({
            year: 2011,
            month: 9,
            date: 12,
            hours: 6,
            minutes: 7,
            seconds: 8,
            milliseconds: 9
        });

    assert.equal(a.year(), 2011, 'year');
    assert.equal(a.month(), 9, 'month');
    assert.equal(a.date(), 12, 'date');
    assert.equal(a.day(), 3, 'day');
    assert.equal(a.hours(), 6, 'hour');
    assert.equal(a.minutes(), 7, 'minute');
    assert.equal(a.seconds(), 8, 'second');
    assert.equal(a.milliseconds(), 9, 'milliseconds');

    var c = moment([2016,0,1]);
    c = c.set({weekYear: 2016});
    assert.equal(c.weekYear(), 2016, 'week year correctly sets with object syntax');
    c = c.set({quarter: 3});
    assert.equal(c.quarter(), 3, 'quarter sets correctly with object syntax');
});

test('day setter', function (assert) {
    var a = moment([2011, 0, 15]);
    assert.equal(a.day(0).date(), 9, 'set from saturday to sunday');
    assert.equal(a.day(6).date(), 15, 'set from saturday to saturday');
    assert.equal(a.day(3).date(), 12, 'set from saturday to wednesday');

    a = moment([2011, 0, 9]);
    assert.equal(a.day(0).date(), 9, 'set from sunday to sunday');
    assert.equal(a.day(6).date(), 15, 'set from sunday to saturday');
    assert.equal(a.day(3).date(), 12, 'set from sunday to wednesday');

    a = moment([2011, 0, 12]);
    assert.equal(a.day(0).date(), 9, 'set from wednesday to sunday');
    assert.equal(a.day(6).date(), 15, 'set from wednesday to saturday');
    assert.equal(a.day(3).date(), 12, 'set from wednesday to wednesday');

    assert.equal(a.day(-7).date(), 2, 'set from wednesday to last sunday');
    assert.equal(a.day(-1).date(), 8, 'set from wednesday to last saturday');
    assert.equal(a.day(-4).date(), 5, 'set from wednesday to last wednesday');

    assert.equal(a.day(7).date(), 16, 'set from wednesday to next sunday');
    assert.equal(a.day(13).date(), 22, 'set from wednesday to next saturday');
    assert.equal(a.day(10).date(), 19, 'set from wednesday to next wednesday');

    assert.equal(a.day(14).date(), 23, 'set from wednesday to second next sunday');
    assert.equal(a.day(20).date(), 29, 'set from wednesday to second next saturday');
    assert.equal(a.day(17).date(), 26, 'set from wednesday to second next wednesday');
});

test('object set ordering', function (assert) {
    var a = moment([2016,3,30]);
    assert.equal(a.set({date:31, month:4}).date(), 31, 'setter order automatically arranged by size');
    var b = moment([2015,1,28]);
    assert.equal(b.set({date:29, year: 2016}).format('YYYY-MM-DD'), '2016-02-29', 'year is prioritized over date');
    //check a nonexistent time in US isn't set
    var c = moment([2016,2,13])
        .set({
            hour:2,
            minutes:30,
            date: 14
        });
    assert.equal(c.format('YYYY-MM-DDTHH:mm'), '2016-03-14T02:30', 'setting hours, minutes date puts date first allowing time set to work');
});

test('string setters', function (assert) {
    var a = moment()
        .year('2011')
        .month('9')
        .date('12')
        .hours('6')
        .minutes('7')
        .seconds('8')
        .milliseconds('9');

    assert.equal(a.year(), 2011, 'year');
    assert.equal(a.month(), 9, 'month');
    assert.equal(a.date(), 12, 'date');
    assert.equal(a.day(), 3, 'day');
    assert.equal(a.hours(), 6, 'hour');
    assert.equal(a.minutes(), 7, 'minute');
    assert.equal(a.seconds(), 8, 'second');
    assert.equal(a.milliseconds(), 9, 'milliseconds');
});

test('setters across DST +1', function (assert) {
    var oldUpdateOffset = moment.updateOffset,
        // Based on a real story somewhere in America/Los_Angeles
        dstAt = moment('2014-03-09T02:00:00-08:00').parseZone(),
        m;

    moment.updateOffset = function (mom, keepTime) {
        if (mom.isBefore(dstAt)) {
            return mom.utcOffset(-8, keepTime);
        }
        return mom.utcOffset(-7, keepTime);
    };

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    assert.equal(m.year(2013).format(), '2013-03-15T00:00:00-08:00', 'year across +1');
    assert.equal(m.month(0).format(), '2014-01-15T00:00:00-08:00', 'month across +1');
    assert.equal(m.date(1).format(), '2014-03-01T00:00:00-08:00', 'date across +1');

    m = moment('2014-03-09T03:05:00-07:00').parseZone();
    assert.equal(m.hour(0).format(), '2014-03-09T00:05:00-08:00', 'hour across +1');

    moment.updateOffset = oldUpdateOffset;
});

test('setters across DST -1', function (assert) {
    var oldUpdateOffset = moment.updateOffset,
        // Based on a real story somewhere in America/Los_Angeles
        dstAt = moment('2014-11-02T02:00:00-07:00').parseZone(),
        m;

    moment.updateOffset = function (mom, keepTime) {
        if (mom.isBefore(dstAt)) {
            return mom.utcOffset(-7, keepTime);
        }
        return mom.utcOffset(-8, keepTime);
    };

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    assert.equal(m.year(2013).format(), '2013-11-15T00:00:00-07:00', 'year across -1');
    assert.equal(m.month(0).format(), '2014-01-15T00:00:00-07:00', 'month across -1');
    assert.equal(m.date(1).format(), '2014-11-01T00:00:00-07:00', 'date across -1');

    m = moment('2014-11-02T03:30:00-08:00').parseZone();
    assert.equal(m.hour(0).format(), '2014-11-02T00:30:00-07:00', 'hour across -1');

    moment.updateOffset = oldUpdateOffset;
});
