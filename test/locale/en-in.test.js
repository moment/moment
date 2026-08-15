import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/en-in';

describe('locale:en-in', () => {
    setupLocaleTests('en-in');

    test('parse', () => {
        var tests =
                'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
            ).toBe(i);
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'Sunday, February 14th 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'Sun, 3PM'],
                ['M Mo MM MMMM MMM', '2 2nd 02 February Feb'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14th 14'],
                ['d do dddd ddd dd', '0 0th Sunday Sun Su'],
                ['DDD DDDo DDDD', '45 45th 045'],
                ['w wo ww', '8 8th 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45th day of the year'],
                ['LTS', '3:25:50 PM'],
                ['L', '14/02/2010'],
                ['LL', '14 February 2010'],
                ['LLL', '14 February 2010 3:25 PM'],
                ['LLLL', 'Sunday, 14 February 2010 3:25 PM'],
                ['l', '14/2/2010'],
                ['ll', '14 Feb 2010'],
                ['lll', '14 Feb 2010 3:25 PM'],
                ['llll', 'Sun, 14 Feb 2010 3:25 PM'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1st').toBe('1st');
        expect(moment([2011, 0, 2]).format('DDDo'), '2nd').toBe('2nd');
        expect(moment([2011, 0, 3]).format('DDDo'), '3rd').toBe('3rd');
        expect(moment([2011, 0, 4]).format('DDDo'), '4th').toBe('4th');
        expect(moment([2011, 0, 5]).format('DDDo'), '5th').toBe('5th');
        expect(moment([2011, 0, 6]).format('DDDo'), '6th').toBe('6th');
        expect(moment([2011, 0, 7]).format('DDDo'), '7th').toBe('7th');
        expect(moment([2011, 0, 8]).format('DDDo'), '8th').toBe('8th');
        expect(moment([2011, 0, 9]).format('DDDo'), '9th').toBe('9th');
        expect(moment([2011, 0, 10]).format('DDDo'), '10th').toBe('10th');

        expect(moment([2011, 0, 11]).format('DDDo'), '11th').toBe('11th');
        expect(moment([2011, 0, 12]).format('DDDo'), '12th').toBe('12th');
        expect(moment([2011, 0, 13]).format('DDDo'), '13th').toBe('13th');
        expect(moment([2011, 0, 14]).format('DDDo'), '14th').toBe('14th');
        expect(moment([2011, 0, 15]).format('DDDo'), '15th').toBe('15th');
        expect(moment([2011, 0, 16]).format('DDDo'), '16th').toBe('16th');
        expect(moment([2011, 0, 17]).format('DDDo'), '17th').toBe('17th');
        expect(moment([2011, 0, 18]).format('DDDo'), '18th').toBe('18th');
        expect(moment([2011, 0, 19]).format('DDDo'), '19th').toBe('19th');
        expect(moment([2011, 0, 20]).format('DDDo'), '20th').toBe('20th');

        expect(moment([2011, 0, 21]).format('DDDo'), '21st').toBe('21st');
        expect(moment([2011, 0, 22]).format('DDDo'), '22nd').toBe('22nd');
        expect(moment([2011, 0, 23]).format('DDDo'), '23rd').toBe('23rd');
        expect(moment([2011, 0, 24]).format('DDDo'), '24th').toBe('24th');
        expect(moment([2011, 0, 25]).format('DDDo'), '25th').toBe('25th');
        expect(moment([2011, 0, 26]).format('DDDo'), '26th').toBe('26th');
        expect(moment([2011, 0, 27]).format('DDDo'), '27th').toBe('27th');
        expect(moment([2011, 0, 28]).format('DDDo'), '28th').toBe('28th');
        expect(moment([2011, 0, 29]).format('DDDo'), '29th').toBe('29th');
        expect(moment([2011, 0, 30]).format('DDDo'), '30th').toBe('30th');

        expect(moment([2011, 0, 31]).format('DDDo'), '31st').toBe('31st');
    });

    test('format month', () => {
        var expected =
                'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected =
                'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(
                moment([2011, 0, 2 + i]).format('dddd ddd dd'),
                expected[i]
            ).toBe(expected[i]);
        }
    });

    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = a few seconds'
        ).toBe('a few seconds');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('a minute');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('a minute');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 minutes');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 minutes');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('an hour');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('an hour');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 hours');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 hours');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 hours');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('a day');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('a day');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 days');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('a day');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 days');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 days');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('a month');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('a month');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('a month');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 months');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 months');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 months');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('a month');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 months');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('a year');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 years');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('a year');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 years');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('in a few seconds');
        expect(moment(0).from(30000), 'suffix').toBe('a few seconds ago');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('a few seconds ago');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'in a few seconds'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('in 5 days');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Today at 12:00 PM'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Today at 12:25 PM'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Today at 1:00 PM'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Tomorrow at 12:00 PM');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Today at 11:00 AM');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Yesterday at 12:00 PM');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [at] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [at] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [at] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[Last] dddd [at] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[Last] dddd [at] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[Last] dddd [at] LT')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), '1 week ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 1 week').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 weeks ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 2 weeks').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1st');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1st');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2nd');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2nd');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('3 03 3rd');
    });

    // Concrete test for Locale#weekdaysMin
    test('Weekdays sort by locale', () => {
        expect(
            moment().localeData('en-in').weekdays(),
            'weekdays start on Sunday'
        ).toEqual(
            'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                '_'
            )
        );
        expect(
            moment().localeData('en-in').weekdays(true),
            'locale-sorted weekdays start on Sunday'
        ).toEqual(
            'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                '_'
            )
        );
        expect(
            moment().localeData('en-in').weekdaysShort(),
            'weekdaysShort start on Sunday'
        ).toEqual('Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'));
        expect(
            moment().localeData('en-in').weekdaysShort(true),
            'locale-sorted weekdaysShort start on Sunday'
        ).toEqual('Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'));
        expect(
            moment().localeData('en-in').weekdaysMin(),
            'weekdaysMin start on Sunday'
        ).toEqual('Su_Mo_Tu_We_Th_Fr_Sa'.split('_'));
        expect(
            moment().localeData('en-in').weekdaysMin(true),
            'locale-sorted weekdaysMin start on Sunday'
        ).toEqual('Su_Mo_Tu_We_Th_Fr_Sa'.split('_'));
    });
});
