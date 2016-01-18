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
});

test('setters plural', function (assert) {
    var a = moment();
    a.years(2011);
    a.months(9);
    a.dates(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(9);
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
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hour(6);
    a.minute(7);
    a.second(8);
    a.millisecond(9);
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
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(9);
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
    a.month(3);
    assert.equal(a.month(), 3, 'month edge case');
});

test('setter programmatic', function (assert) {
    var a = moment();
    a.set('year', 2011);
    a.set('month', 9);
    a.set('date', 12);
    a.set('hours', 6);
    a.set('minutes', 7);
    a.set('seconds', 8);
    a.set('milliseconds', 9);
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
    a.month(3);
    assert.equal(a.month(), 3, 'month edge case');
});

// Disable this, until we weekYear setter is fixed.
// https://github.com/moment/moment/issues/1379
// test('setters programatic with weeks', function (assert) {
//     var a = moment();
//     a.set('weekYear', 2001);
//     a.set('week', 49);
//     a.set('day', 4);
//     assert.equals(a.weekYear(), 2001);
//     assert.equals(a.week(), 49);
//     assert.equals(a.day(), 4);

//     a.set('weekday', 1);
//     assert.equals(a.weekday(), 1);

//     assert.done();
//},

// I think this suffers from the same issue as the non-iso version.
// test('setters programatic with weeks ISO', function (assert) {
//     var a = moment();
//     a.set('isoWeekYear', 2001);
//     a.set('isoWeek', 49);
//     a.set('isoWeekday', 4);

//     assert.equals(a.weekYear(), 2001);
//     assert.equals(a.week(), 49);
//     assert.equals(a.day(), 4);

//     assert.done();
//},

test('setters strings', function (assert) {
    var a = moment([2012]).locale('en');
    assert.equal(a.clone().day(0).day('Wednesday').day(), 3, 'day full name');
    assert.equal(a.clone().day(0).day('Wed').day(), 3, 'day short name');
    assert.equal(a.clone().day(0).day('We').day(), 3, 'day minimal name');
    assert.equal(a.clone().day(0).day('invalid').day(), 0, 'invalid day name');
    assert.equal(a.clone().month(0).month('April').month(), 3, 'month full name');
    assert.equal(a.clone().month(0).month('Apr').month(), 3, 'month short name');
    assert.equal(a.clone().month(0).month('invalid').month(), 0, 'invalid month name');
});

test('setters - falsey values', function (assert) {
    var a = moment();
    // ensure minutes wasn't coincidentally 0 already
    a.minutes(1);
    a.minutes(0);
    assert.equal(a.minutes(), 0, 'falsey value');
});

test('chaining setters', function (assert) {
    var a = moment();
    a.year(2011)
     .month(9)
     .date(12)
     .hours(6)
     .minutes(7)
     .seconds(8);
    assert.equal(a.year(), 2011, 'year');
    assert.equal(a.month(), 9, 'month');
    assert.equal(a.date(), 12, 'date');
    assert.equal(a.day(), 3, 'day');
    assert.equal(a.hours(), 6, 'hour');
    assert.equal(a.minutes(), 7, 'minute');
    assert.equal(a.seconds(), 8, 'second');
});

test('setter with multiple unit values', function (assert) {
    var a = moment();
    a.set({
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
});

test('day setter', function (assert) {
    var a = moment([2011, 0, 15]);
    assert.equal(moment(a).day(0).date(), 9, 'set from saturday to sunday');
    assert.equal(moment(a).day(6).date(), 15, 'set from saturday to saturday');
    assert.equal(moment(a).day(3).date(), 12, 'set from saturday to wednesday');

    a = moment([2011, 0, 9]);
    assert.equal(moment(a).day(0).date(), 9, 'set from sunday to sunday');
    assert.equal(moment(a).day(6).date(), 15, 'set from sunday to saturday');
    assert.equal(moment(a).day(3).date(), 12, 'set from sunday to wednesday');

    a = moment([2011, 0, 12]);
    assert.equal(moment(a).day(0).date(), 9, 'set from wednesday to sunday');
    assert.equal(moment(a).day(6).date(), 15, 'set from wednesday to saturday');
    assert.equal(moment(a).day(3).date(), 12, 'set from wednesday to wednesday');

    assert.equal(moment(a).day(-7).date(), 2, 'set from wednesday to last sunday');
    assert.equal(moment(a).day(-1).date(), 8, 'set from wednesday to last saturday');
    assert.equal(moment(a).day(-4).date(), 5, 'set from wednesday to last wednesday');

    assert.equal(moment(a).day(7).date(), 16, 'set from wednesday to next sunday');
    assert.equal(moment(a).day(13).date(), 22, 'set from wednesday to next saturday');
    assert.equal(moment(a).day(10).date(), 19, 'set from wednesday to next wednesday');

    assert.equal(moment(a).day(14).date(), 23, 'set from wednesday to second next sunday');
    assert.equal(moment(a).day(20).date(), 29, 'set from wednesday to second next saturday');
    assert.equal(moment(a).day(17).date(), 26, 'set from wednesday to second next wednesday');
});

test('time ISO formats', function(assert){
   var a = moment([2016]);
   
    assert.equal(a.setTime('22:35:12.45').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T22:35:12.4500', 'iso long');
    assert.equal(a.setTime('22:35:12,45').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T22:35:12.4500', 'iso long comma');
    assert.equal(a.setTime('22:35:12').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T22:35:12.0000', 'iso no fraction');
    assert.equal(a.setTime('22:35').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T22:35:00.0000', 'iso no seconds');
    assert.equal(a.setTime('223512.45').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T22:35:12.4500', 'iso no colons dot fraction');
    assert.equal(a.setTime('223512,45').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T22:35:12.4500', 'iso no colons comma fraction');
    assert.equal(a.setTime('223512').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T22:35:12.0000', 'iso no colons no fraction');
    assert.equal(a.setTime('09').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T09:00:00.0000', 'HH');
    assert.equal(a.setTime('0622').format('YYYY-MM-DDTHH:mm:ss.SSSS'), '2016-01-01T06:22:00.0000' ,'set in HHmm format');
});

test('string with format', function (assert) {
    moment.locale('en');
    var a = [
        ['h:mm a',              '12:00 pm'],
        ['h:mm a',              '12:30 pm'],
        ['h:mm a',              '12:00 am'],
        ['h:mm a',              '12:30 am'],
        ['HH:mm',               '12:00'],
        ['HH:mm:ss',            '12:00:00'],
        ['HH:mm:ss',            '12:30:00'],
        ['HH:mm:ss',            '00:00:00'],
        ['HH:mm:ss S',          '00:30:00 1'],
        ['HH:mm:ss SS',         '00:30:00 12'],
        ['HH:mm:ss SSS',        '00:30:00 123'],
        ['HH:mm:ss S',          '00:30:00 7'],
        ['HH:mm:ss SS',         '00:30:00 78'],
        ['HH:mm:ss SSS',        '00:30:00 789'],
        ['LT',                  '12:30 AM'],
        ['LTS',                 '12:30:29 AM']
    ],
    m,
    i;

    for (i = 0; i < a.length; i++) {
        m = moment({year:2012, month:3, day:1});
        m.setTime(a[i][1], a[i][0]);
        assert.ok(m.isValid());
        assert.equal(m.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('time setter numeric', function(assert){
   var a = moment([2016]);
    assert.equal(a.setTime(65.505).hours(), 1, 'hours in time set numeric');
    assert.equal(a.setTime(65.505).minutes(), 5, 'minutes in time set numeric');
    assert.equal(a.setTime(65.505).seconds(), 30, 'seconds in time set numeric');
    assert.equal(a.setTime(65.505).milliseconds(), 300, 'milliseconds in time set numeric' );
});


test('time setter matching am/pm', function (assert) {
    var a = moment({year: 2012, month:8, day: 3});
    assert.equal(a.setTime('03:00PM',   'hh:mmA').format('hh:mmA'), '03:00PM', 'am/pm should parse correctly for PM');
    assert.equal(a.setTime('03:00P.M.', 'hh:mmA').format('hh:mmA'), '03:00PM', 'am/pm should parse correctly for P.M.');
    assert.equal(a.setTime('03:00P',    'hh:mmA').format('hh:mmA'), '03:00PM', 'am/pm should parse correctly for P');
    assert.equal(a.setTime('03:00pm',   'hh:mmA').format('hh:mmA'), '03:00PM', 'am/pm should parse correctly for pm');
    assert.equal(a.setTime('03:00p.m.', 'hh:mmA').format('hh:mmA'), '03:00PM', 'am/pm should parse correctly for p.m.');
    assert.equal(a.setTime('03:00p',    'hh:mmA').format('hh:mmA'), '03:00PM', 'am/pm should parse correctly for p');

    assert.equal(a.setTime('03:00AM',   'hh:mmA').format('hh:mmA'), '03:00AM', 'am/pm should parse correctly for AM');
    assert.equal(a.setTime('03:00A.M.', 'hh:mmA').format('hh:mmA'), '03:00AM', 'am/pm should parse correctly for A.M.');
    assert.equal(a.setTime('03:00A',    'hh:mmA').format('hh:mmA'), '03:00AM', 'am/pm should parse correctly for A');
    assert.equal(a.setTime('03:00am',   'hh:mmA').format('hh:mmA'), '03:00AM', 'am/pm should parse correctly for am');
    assert.equal(a.setTime('03:00a.m.', 'hh:mmA').format('hh:mmA'), '03:00AM', 'am/pm should parse correctly for a.m.');
    assert.equal(a.setTime('03:00a',    'hh:mmA').format('hh:mmA'), '03:00AM', 'am/pm should parse correctly for a');
});


test('time setter with am/pm not used even though in format', function (assert) {
    moment.locale('en');
    var a = moment({year:2012, month:4, day: 1});
    assert.equal(a.setTime('12:25:00', 'h:m:s a').format('YYYY-MM-DDTHH:mm:ss'), '2012-05-01T12:25:00', 'should not break if am/pm is left off from the parsing tokens');
    assert.equal(a.setTime('12:25:00 am', 'h:m:s a').format('YYYY-MM-DDTHH:mm:ss'), '2012-05-01T00:25:00', 'should not break if am/pm is left off from the parsing tokens');
    assert.equal(a.setTime('12:25:00 pm', 'h:m:s a').format('YYYY-MM-DDTHH:mm:ss'), '2012-05-01T12:25:00', 'should not break if am/pm is left off from the parsing tokens');
    
    assert.ok(a.setTime('12:25:00', ' h:m:s a').isValid());
    assert.ok(a.setTime('12:25:00 am', 'h:m:s a').isValid());
    assert.ok(a.setTime('12:25:00 pm', 'h:m:s a').isValid());
});