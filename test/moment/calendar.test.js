import { describe, expect, test } from 'vitest';
// These tests are for locale independent features
// locale dependent tests would be in locale test folder
import moment from '../../src/moment';

describe('calendar', () => {
    test('passing a function', () => {
        var a = moment().hours(13).minutes(0).seconds(0);
        expect(
            moment(a).calendar(null, {
                sameDay: function () {
                    return 'h:mmA';
                },
            }),
            'should equate'
        ).toBe('1:00PM');
    });

    test('extending calendar options', () => {
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
            expect(
                a.calendar('2016-01-01'),
                'Ad hoc calendar format for this month'
            ).toBe('This month on the 29th');
            expect(
                b.calendar('2016-01-01'),
                'Ad hoc calendar format for next month'
            ).toBe('Next month on the 1st');
            expect(
                a.locale('fr').calendar('2016-01-01'),
                'French falls back to default because thisMonth is not defined in that locale'
            ).toBe(a.locale('fr').format('L'));
        } finally {
            moment.calendarFormat = calendarFormat;
            moment.updateLocale('en', null);
        }
    });

    test('calendar overload time - passing one parameter - a Moment', () => {
        var a = moment().hours(13).minutes(23).seconds(45),
            b = moment().add(1, 'd');
        expect(a.calendar(b), 'should equate').toBe('Yesterday at 1:23 PM');
    });

    test('calendar overload time - passing one parameter - a Date', () => {
        var a = moment().hours(13).minutes(23).seconds(45).subtract(1, 'd'),
            d = new Date();
        expect(a.calendar(d), 'should equate').toBe('Yesterday at 1:23 PM');
    });

    test('calendar overload time - passing one parameter - a string', () => {
        var a = moment([2808, 11, 1]);
        expect(a.calendar('1999-12-31'), 'should equate').toBe('12/01/2808');
    });

    test('calendar overload time - passing one parameter - a number', () => {
        var a = moment([2808, 11, 1]);
        expect(a.calendar(Date.now()), 'should equate').toBe('12/01/2808');
    });

    test('calendar overload time - passing one parameter - an array of numbers', () => {
        var a = moment()
            .year(2808)
            .month(11)
            .date(1)
            .hours(13)
            .minutes(23)
            .seconds(45);
        expect(a.calendar([2808, 11, 1, 13, 23, 45]), 'should equate').toBe(
            'Today at 1:23 PM'
        );
    });

    test('calendar overload time - passing one parameter - an array of strings', () => {
        var a = moment()
            .year(2808)
            .month(11)
            .date(1)
            .hours(13)
            .minutes(23)
            .seconds(45);
        expect(
            a.calendar(['2808', '11', '1', '13', '23', '45']),
            'should equate'
        ).toBe('Today at 1:23 PM');
    });

    test('calendar overload time - passing one parameter - a moment input object', () => {
        var a = moment(),
            todayTime = new Date(),
            month = todayTime.getMonth() + 1,
            day = todayTime.getDate(),
            year = todayTime.getFullYear(),
            expectedString;

        month = month < 10 ? '0' + month.toString() : month;
        day = day < 10 ? '0' + day.toString() : day;

        expectedString = month + '/' + day + '/' + year;

        expect(
            a.calendar({
                month: 12,
                day: 1,
                year: 2808,
            }),
            'should equate'
        ).toBe(expectedString);
    });

    test('calendar overload format - passing one parameter - object w/ sameDay as a string', () => {
        var a = moment().hours(13).minutes(23).seconds(45);
        expect(a.calendar({ sameDay: 'h:mm:ssA' }), 'should equate').toBe(
            '1:23:45PM'
        );
    });

    test('calendar overload format - passing one parameter - object w/ sameDay as function returning a string', () => {
        var a = moment().hours(13).minutes(23).seconds(45);
        expect(
            a.calendar({
                sameDay: function () {
                    return 'h:mm:ssA';
                },
            }),
            'should equate'
        ).toBe('1:23:45PM');
    });

    test('defaulting to current date', () => {
        var a = moment().hours(13).minutes(23).seconds(45);
        expect(moment(a).calendar(), 'should equate').toBe('Today at 1:23 PM');
    });

    test('calendar overload time - passing one parameter - a falsy value', () => {
        var a = moment().hours(13).minutes(23).seconds(45),
            tests = [
                '',
                0,
                -0,
                // 0n,
                false,
                NaN,
                null,
                undefined,
            ],
            i;

        for (i = 0; i < tests.length; ++i) {
            expect(moment(a).calendar(tests[i]), 'should equate').toBe(
                'Today at 1:23 PM'
            );
        }
    });
});
