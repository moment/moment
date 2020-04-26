// These tests are for locale independent features
// locale dependent tests would be in locale test folder
import { module, test } from '../qunit';
import moment from '../../moment';

module('calendar');

test('passing a function', function (assert) {
    var a = moment().hours(13).minutes(0).seconds(0);
    assert.equal(
        moment(a).calendar(null, {
            sameDay: function () {
                return 'h:mmA';
            },
        }),
        '1:00PM',
        'should equate'
    );
});

test('extending calendar options', function (assert) {
    var calendarFormat = moment.calendarFormat,
        a,
        b;

    moment.calendarFormat = function (myMoment, now) {
        var diff = myMoment.diff(now, 'days', true),
            nextMonth = now.clone().add(1, 'month'),
            retVal =
                diff < -6
                    ? 'sameElse'
                    : diff < -1
                    ? 'lastWeek'
                    : diff < 0
                    ? 'lastDay'
                    : diff < 1
                    ? 'sameDay'
                    : diff < 2
                    ? 'nextDay'
                    : diff < 7
                    ? 'nextWeek'
                    : myMoment.month() === now.month() &&
                      myMoment.year() === now.year()
                    ? 'thisMonth'
                    : nextMonth.month() === myMoment.month() &&
                      nextMonth.year() === myMoment.year()
                    ? 'nextMonth'
                    : 'sameElse';
        return retVal;
    };

    moment.updateLocale('en', {
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            thisMonth: '[This month on the] Do',
            nextMonth: '[Next month on the] Do',
            sameElse: 'L',
        },
    });

    a = moment('2016-01-01').add(28, 'days');
    b = moment('2016-01-01').add(1, 'month');

    try {
        assert.equal(
            a.calendar('2016-01-01'),
            'This month on the 29th',
            'Ad hoc calendar format for this month'
        );
        assert.equal(
            b.calendar('2016-01-01'),
            'Next month on the 1st',
            'Ad hoc calendar format for next month'
        );
        assert.equal(
            a.locale('fr').calendar('2016-01-01'),
            a.locale('fr').format('L'),
            'French falls back to default because thisMonth is not defined in that locale'
        );
    } finally {
        moment.calendarFormat = calendarFormat;
        moment.updateLocale('en', null);
    }
});

test('calendar overload time - passing one parameter - a Moment', function (assert) {
    var a = moment().hours(13).minutes(23).seconds(45),
        b = moment().add(1, 'd');
    assert.equal(a.calendar(b), 'Yesterday at 1:23 PM', 'should equate');
});

test('calendar overload time - passing one parameter - a Date', function (assert) {
    var a = moment().hours(13).minutes(23).seconds(45).subtract(1, 'd'),
        d = new Date();
    assert.equal(a.calendar(d), 'Yesterday at 1:23 PM', 'should equate');
});

test('calendar overload time - passing one parameter - a string', function (assert) {
    var a = moment([2808, 11, 1]);
    assert.equal(a.calendar('1999-12-31'), '12/01/2808', 'should equate');
});

test('calendar overload time - passing one parameter - a number', function (assert) {
    var a = moment([2808, 11, 1]);
    assert.equal(a.calendar(Date.now()), '12/01/2808', 'should equate');
});

test('calendar overload time - passing one parameter - an array of numbers', function (assert) {
    var a = moment()
        .year(2808)
        .month(11)
        .date(1)
        .hours(13)
        .minutes(23)
        .seconds(45);
    assert.equal(
        a.calendar([2808, 11, 1, 13, 23, 45]),
        'Today at 1:23 PM',
        'should equate'
    );
});

test('calendar overload time - passing one parameter - an array of strings', function (assert) {
    var a = moment()
        .year(2808)
        .month(11)
        .date(1)
        .hours(13)
        .minutes(23)
        .seconds(45);
    assert.equal(
        a.calendar(['2808', '11', '1', '13', '23', '45']),
        'Today at 1:23 PM',
        'should equate'
    );
});

test('calendar overload time - passing one parameter - a moment input object', function (assert) {
    var a = moment(),
        todayTime = new Date(),
        month = todayTime.getMonth() + 1,
        day = todayTime.getDate(),
        year = todayTime.getFullYear(),
        expectedString;

    month = month < 10 ? '0' + month.toString() : month;
    day = day < 10 ? '0' + day.toString() : day;

    expectedString = month + '/' + day + '/' + year;

    assert.equal(
        a.calendar({
            month: 12,
            day: 1,
            year: 2808,
        }),
        expectedString,
        'should equate'
    );
});

test('calendar overload format - passing one parameter - object w/ sameDay as a string', function (assert) {
    var a = moment().hours(13).minutes(23).seconds(45);
    assert.equal(
        a.calendar({ sameDay: 'h:mm:ssA' }),
        '1:23:45PM',
        'should equate'
    );
});

test('calendar overload format - passing one parameter - object w/ sameDay as function returning a string', function (assert) {
    var a = moment().hours(13).minutes(23).seconds(45);
    assert.equal(
        a.calendar({
            sameDay: function () {
                return 'h:mm:ssA';
            },
        }),
        '1:23:45PM',
        'should equate'
    );
});
