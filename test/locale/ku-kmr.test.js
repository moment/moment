import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ku-kmr';

describe('locale:ku-kmr', () => {
    setupLocaleTests('ku-kmr');

    test('parse', () => {
        var i,
            tests = [
                'Rêbendan Rêb',
                'Sibat Sib',
                'Adar Ada',
                'Nîsan Nîs',
                'Gulan Gul',
                'Hezîran Hez',
                'Tîrmeh Tîr',
                'Tebax Teb',
                'Îlon Îlo',
                'Cotmeh Cot',
                'Mijdar Mij',
                'Berfanbar Ber',
            ];

        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
            ).toBe(i);
        }

        function equalTestStrict(input, mmm, monthIndex) {
            expect(
                moment(input, mmm, true).month(),
                input +
                    ' ' +
                    mmm +
                    ' should be strict month ' +
                    (monthIndex + 1)
            ).toBe(monthIndex);
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

            equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, Do MMMM YYYY, h:mm:ss a',
                    'Yekşem, 14ê Sibat 2010, 3:25:50 pn',
                ],
                ['ddd, hA', 'Yek, 3PN'],
                ['M Mo MM MMMM MMM', '2 2. 02 Sibat Sib'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14ê 14'],
                ['d do dddd ddd dd', '0 0ê Yekşem Yek Ye'],
                ['DDD DDDo DDDD', '45 45ê 045'],
                ['w wo ww', '6 6. 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pn PN'],
                ['DDDo [Adarê]', '45ê Adarê'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14ê Sibata 2010an'],
                ['LLL', '14ê Sibata 2010an 15:25'],
                ['LLLL', 'Yekşem, 14ê Sibata 2010an 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14ê Sib. 2010an'],
                ['lll', '14ê Sib. 2010an 15:25'],
                ['llll', 'Yek., 14ê Sib. 2010an 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('parse era', () => {
        expect(moment('2010 AD', 'y N', true).isValid(), '2010 AD').toBe(true);
        expect(moment('2010 AD', 'y N', true).year(), '2010 AD').toBe(2010);

        expect(
            moment('2010 Anno Domini', 'y N', true).isValid(),
            '2010 Anno Domini'
        ).toBe(false);
        expect(
            moment('2010 Anno Domini', 'y N', false).isValid(),
            '2010 Anno Domini'
        ).toBe(true);
        expect(
            moment('2010 Anno Domini', 'y NNNN', true).isValid(),
            '2010 Anno Domini'
        ).toBe(true);
        expect(
            moment('2010 Anno Domini', 'y NNNN', true).year(),
            '2010 Anno Domini'
        ).toBe(2010);
        expect(
            moment('2010 Anno Domini', 'y N', false).year(),
            '2010 Anno Domini'
        ).toBe(2010);

        expect(moment('469 BC', 'y N', true).isValid(), '469 BC').toBe(true);
        expect(moment('469 BC', 'y N', true).year(), '469 BC').toBe(-468);

        expect(
            moment('469 Before Christ', 'y NNNN', true).isValid(),
            '469 Before Christ'
        ).toBe(true);
        expect(
            moment('469 Before Christ', 'y NNNN', true).year(),
            '469 Before Christ'
        ).toBe(-468);
    });

    test('format era', () => {
        var a = [
                ['+000001-01-01', 'N, NN, NNN', 'AD, AD, AD'],
                ['+000001-01-01', 'NNNN', 'Anno Domini'],
                ['+000001-01-01', 'NNNNN', 'AD'],
                ['+000001-01-01', 'y', '1'],

                ['+000000-12-31', 'N, NN, NNN', 'BC, BC, BC'],
                ['+000000-12-31', 'NNNN', 'Before Christ'],
                ['+000000-12-31', 'NNNNN', 'BC'],
                ['+000000-12-31', 'y', '1'],

                ['-000001-12-31', 'N, NN, NNN', 'BC, BC, BC'],
                ['-000001-12-31', 'NNNN', 'Before Christ'],
                ['-000001-12-31', 'NNNNN', 'BC'],
                ['-000001-12-31', 'y', '2'],
            ],
            i,
            l;

        for (i = 0, l = a.length; i < l; ++i) {
            expect(
                moment(a[i][0]).format(a[i][1]),
                a[i][0] + '; ' + a[i][1] + ' ---> ' + a[i][2]
            ).toBe(a[i][2]);
        }
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1st').toBe('1ê');
        expect(moment([2011, 0, 2]).format('DDDo'), '2nd').toBe('2yê');
        expect(moment([2011, 0, 3]).format('DDDo'), '3rd').toBe('3yê');
        expect(moment([2011, 0, 4]).format('DDDo'), '4th').toBe('4ê');
        expect(moment([2011, 0, 5]).format('DDDo'), '5th').toBe('5ê');
        expect(moment([2011, 0, 6]).format('DDDo'), '6th').toBe('6ê');
        expect(moment([2011, 0, 7]).format('DDDo'), '7th').toBe('7ê');
        expect(moment([2011, 0, 8]).format('DDDo'), '8th').toBe('8ê');
        expect(moment([2011, 0, 9]).format('DDDo'), '9th').toBe('9ê');
        expect(moment([2011, 0, 10]).format('DDDo'), '10th').toBe('10ê');

        expect(moment([2011, 0, 11]).format('DDDo'), '11th').toBe('11ê');
        expect(moment([2011, 0, 12]).format('DDDo'), '12th').toBe('12ê');
        expect(moment([2011, 0, 13]).format('DDDo'), '13th').toBe('13ê');
        expect(moment([2011, 0, 14]).format('DDDo'), '14th').toBe('14ê');
        expect(moment([2011, 0, 15]).format('DDDo'), '15th').toBe('15ê');
        expect(moment([2011, 0, 16]).format('DDDo'), '16th').toBe('16ê');
        expect(moment([2011, 0, 17]).format('DDDo'), '17th').toBe('17ê');
        expect(moment([2011, 0, 18]).format('DDDo'), '18th').toBe('18ê');
        expect(moment([2011, 0, 19]).format('DDDo'), '19th').toBe('19ê');
        expect(moment([2011, 0, 20]).format('DDDo'), '20th').toBe('20ê');

        expect(moment([2011, 0, 21]).format('DDDo'), '21st').toBe('21ê');
        expect(moment([2011, 0, 22]).format('DDDo'), '22nd').toBe('22yê');
        expect(moment([2011, 0, 23]).format('DDDo'), '23rd').toBe('23yê');
        expect(moment([2011, 0, 24]).format('DDDo'), '24th').toBe('24ê');
        expect(moment([2011, 0, 25]).format('DDDo'), '25th').toBe('25ê');
        expect(moment([2011, 0, 26]).format('DDDo'), '26th').toBe('26ê');
        expect(moment([2011, 0, 27]).format('DDDo'), '27th').toBe('27ê');
        expect(moment([2011, 0, 28]).format('DDDo'), '28th').toBe('28ê');
        expect(moment([2011, 0, 29]).format('DDDo'), '29th').toBe('29ê');
        expect(moment([2011, 0, 30]).format('DDDo'), '30th').toBe('30ê');

        expect(moment([2011, 0, 31]).format('DDDo'), '31st').toBe('31ê');
    });

    test('format month', () => {
        var i,
            expected = [
                'Rêbendan Rêb',
                'Sibat Sib',
                'Adar Ada',
                'Nîsan Nîs',
                'Gulan Gul',
                'Hezîran Hez',
                'Tîrmeh Tîr',
                'Tebax Teb',
                'Îlon Îlo',
                'Cotmeh Cot',
                'Mijdar Mij',
                'Berfanbar Ber',
            ];

        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var i,
            expected = [
                'Yekşem Yek Ye',
                'Duşem Du Du',
                'Sêşem Sê Sê',
                'Çarşem Çar Ça',
                'Pêncşem Pên Pê',
                'În În În',
                'Şemî Şem Şe',
            ];

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
        ).toBe('çend sanîye');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('deqîqeyek');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('deqîqeyek');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 deqîqe');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 deqîqe');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('saetek');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('saetek');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 saet');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 saet');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 saet');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('rojek');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('rojek');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 roj');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('rojek');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 roj');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 roj');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('mehek');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('mehek');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('mehek');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 meh');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 meh');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 meh');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('mehek');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 meh');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('salek');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 sal');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('salek');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 sal');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('di çend sanîyeyan de');
        expect(moment(0).from(30000), 'suffix').toBe('berî çend sanîyeyan');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('berî çend sanîyeyan');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'di çend sanîyeyan de'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'di 5 rojan de'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Îro di saet 12:00 de'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Îro di saet 12:25 de'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Îro di saet 13:00 de'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Sibê di saet 12:00 de');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Îro di saet 11:00 de');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Duh di saet 12:00 de');
    });

    test('calendar next week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [di saet] LT [de]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [di saet] LT [de]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [di saet] LT [de]')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd[a borî di saet] LT [de]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd[a borî di saet] LT [de]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd[a borî di saet] LT [de]')
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
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52.');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1.');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1.');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2.');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2.');
    });

    test('weekdays strict parsing', () => {
        var m = moment('2015-01-01T12', moment.ISO_8601, true),
            locale = moment.localeData('ku-kmr'),
            i;

        for (i = 0; i < 7; ++i) {
            expect(
                moment(locale.weekdays(m.day(i), ''), 'dddd', true).isValid(),
                'parse weekday ' + i
            ).toBe(true);
            expect(
                moment(
                    locale.weekdaysShort(m.day(i), ''),
                    'ddd',
                    true
                ).isValid(),
                'parse short weekday ' + i
            ).toBe(true);
            expect(
                moment(locale.weekdaysMin(m.day(i), ''), 'dd', true).isValid(),
                'parse min weekday ' + i
            ).toBe(true);
        }
    });
});
